import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import BoardTile from "./BoardTile";
import {
  Minesweeper,
  MinesweeperTileType,
  NumberTileType,
  OverlayState,
} from "./minesweeper";

export interface IBoard {}

function makeEmptyBoard(
  height: number,
  width: number,
  fillType?: MinesweeperTileType
): MinesweeperTileType[][] {
  let board = new Array(height)
    .fill(0)
    .map((_) => new Array(width).fill(fillType ?? "mt"));
  return board;
}

function makeBoard(
  height: number,
  width: number,
  bombs: number
): MinesweeperTileType[][] {
  let board = makeEmptyBoard(height, width);
  board = addBombs(board, bombs);
  return board;
}

function addBombs(
  board: MinesweeperTileType[][],
  numBombs: number
): MinesweeperTileType[][] {
  const bombCounts = new Array(board.length)
    .fill(0)
    .map(() => new Array(board[0].length).fill(0));
  const width = board[0].length;
  const height = board.length;
  const numTiles = board.length * board[0].length;
  new Array(numBombs).fill("").forEach(() => {
    while (true) {
      const tileIndex = Math.floor(Math.random() * numTiles);
      const row = Math.floor(tileIndex / width);
      const col = tileIndex % board.length;
      if (board[row][col] !== "bomb") {
        board = addBomb(board, row, col);
        const neighbors = walkNeighbors(row, col, height, width);
        neighbors.forEach(([row, col]) => {
          bombCounts[row][col]++;
        });
        break;
      }
    }
  });
  board = paintNumbers(bombCounts, board);
  return board;
}

function walkNeighbors(
  trow: number,
  tcol: number,
  height: number,
  width: number
): number[][] {
  const nw = trow !== 0 && tcol !== 0 ? [trow - 1, tcol - 1] : null;
  const n = trow > 0 ? [trow - 1, tcol] : null;
  const ne = trow > 0 && tcol + 1 < width ? [trow - 1, tcol + 1] : null;
  const w = tcol > 0 ? [trow, tcol - 1] : null;
  const e = tcol + 1 < width ? [trow, tcol + 1] : null;
  const sw = trow + 1 < height && tcol > 0 ? [trow + 1, tcol - 1] : null;
  const s = trow + 1 < height ? [trow + 1, tcol] : null;
  const se =
    trow + 1 < height && tcol + 1 < width ? [trow + 1, tcol + 1] : null;
  const coords = [nw, n, ne, w, e, sw, s, se].filter(
    (v) => v !== null
  ) as number[][];
  return coords;
}

function addBomb(
  board: MinesweeperTileType[][],
  row: number,
  col: number
): MinesweeperTileType[][] {
  const newTable = [...board];
  newTable[row] = [...board[row]];
  newTable[row][col] = "bomb";
  return newTable;
}

function paintNumbers(
  numMap: number[][],
  board: MinesweeperTileType[][]
): MinesweeperTileType[][] {
  numMap.forEach((row, i) => {
    row.forEach((neighborBombCount, j) => {
      if (board[i][j] !== "bomb" && neighborBombCount > 0) {
        board = addNumber(board, i, j, neighborBombCount);
      }
    });
  });
  return board;
}

function addNumber(
  board: MinesweeperTileType[][],
  row: number,
  col: number,
  number: number
): MinesweeperTileType[][] {
  const newTable = [...board];
  newTable[row] = [...board[row]];
  newTable[row][col] = number.toString(10) as NumberTileType;
  return newTable;
}

function changeOverlay(
  table: OverlayState[][],
  row: number,
  col: number,
  newState: OverlayState
): OverlayState[][] {
  const newTable = [...table];
  newTable[row] = [...table[row]];
  newTable[row][col] = newState;
  return newTable;
}

function getDimensions(arr: any[][]): [height: number, width: number] {
  return [arr.length, arr[0].length];
}

function revealSurroundingEmpty(
  board: MinesweeperTileType[][],
  table: OverlayState[][],
  row: number,
  col: number
): OverlayState[][] {
  const [height, width] = getDimensions(board);
  if (table[row][col] === "revealed") {
    return table;
  }
  if (board[row][col] === "mt") {
    table = changeOverlay(table, row, col, "revealed");
    const walk = walkNeighbors(row, col, height, width);
    walk.forEach(([i, j]) => {
      table = revealSurroundingEmpty(board, table, i, j);
    });
  }
  if (!isNaN(Number.parseInt(board[row][col]))) {
    table = changeOverlay(table, row, col, "revealed");
  }
  return table;
}

export const Board: React.FC<IBoard> = (props) => {
  const [board, setBoard] = React.useState<Minesweeper>({
    tiles: makeBoard(10, 10, 10),
    revealed: new Array(10)
      .fill(0)
      .map((v) => new Array(10).fill("unrevealed")),
  });

  const onClick = (row: number, col: number) => {
    if (board.tiles[row][col] === "bomb") {
      alert("YOU LOSE");
      setBoard({
        tiles: makeBoard(10, 10, 10),
        revealed: new Array(10)
          .fill(0)
          .map((v) => new Array(10).fill("unrevealed")),
      });
    } else if (board.tiles[row][col] === "mt") {
      const revealed = revealSurroundingEmpty(
        board.tiles,
        board.revealed,
        row,
        col
      );
      setBoard({
        ...board,
        revealed: revealed,
      });
    } else {
      setBoard({
        ...board,
        revealed: changeOverlay(board.revealed, row, col, "revealed"),
      });
    }
  };

  const onRightClick = (row: number, col: number) => {
    if (board.revealed[row][col] === "flagged") {
      setBoard({
        ...board,
        revealed: changeOverlay(board.revealed, row, col, "unrevealed"),
      });
      return;
    }
    setBoard({
      ...board,
      revealed: changeOverlay(board.revealed, row, col, "flagged"),
    });
  };

  return (
    <Box>
      {board.tiles.map((row, i) => (
        <Flex key={`${i}`}>
          {row.map((cell, j) => {
            return (
              <BoardTile
                visible={board.revealed[i][j]}
                tile={cell}
                key={`${i}_${j}`}
                onClick={() => onClick(i, j)}
                onRightClick={() => onRightClick(i, j)}
              />
            );
          })}
        </Flex>
      ))}
    </Box>
  );
};

export default Board;
