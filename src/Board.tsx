import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import BoardTile from "./BoardTile";
import {
  Minesweeper,
  MinesweeperTile,
  MinesweeperTileType,
  NumberTileType,
} from "./minesweeper";
import MinesweeperTable from "./MineSweeperTable";

export interface IBoard {}

function makeEmptyBoard(
  height: number,
  width: number
): MinesweeperTileType[][] {
  let board = new Array(height).fill(0).map((_) => new Array(width).fill("mt"));
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

function makeExampleBoard(
  height: number,
  width: number
): MinesweeperTileType[][] {
  return [["flag", "1", "2"]];
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
        console.log(neighborBombCount);
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

export const Board: React.FC<IBoard> = (props) => {
  const [board, setBoard] = React.useState<MinesweeperTileType[][]>(
    makeBoard(10, 10, 10)
  );

  const onClick = (row: number, col: number) => {
    if (board[row][col] === "bomb") {
      alert("YOU LOSE");
      let newBoard = makeBoard(10, 10, 10);
      newBoard = addBombs(board, 10);
      setBoard(newBoard);
    }
  };

  return (
    <Box>
      {board.map((row, i) => (
        <Flex key={`${i}`}>
          {row.map((cell, j) => {
            return (
              <BoardTile
                tile={cell}
                key={`${i}_${j}`}
                onClick={() => onClick(i, j)}
              />
            );
          })}
        </Flex>
      ))}
    </Box>
  );
};

export default Board;
