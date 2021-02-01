import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import BoardTile from "./BoardTile";
import { Minesweeper, MinesweeperTile } from "./minesweeper";

export interface IBoard {}

function makeBoard(height: number, width: number): MinesweeperTile[][] {
  return new Array(height).fill(0).map((_) => new Array(width).fill("mt"));
}

function makeExampleBoard(height: number, width: number): MinesweeperTile[][] {
  return [["flag", "1", "2"]];
}

export const Board: React.FC<IBoard> = (props) => {
  const [board, setBoard] = React.useState<MinesweeperTile[][]>(
    makeBoard(10, 10)
  );
  console.log(board);
  return (
    <Box>
      {board.map((row) => (
        <Flex>
          {row.map((cell) => {
            return <BoardTile tile={cell} />;
          })}
        </Flex>
      ))}
    </Box>
  );
};

export default Board;
