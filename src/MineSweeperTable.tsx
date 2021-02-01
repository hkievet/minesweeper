import { Box } from "@chakra-ui/react";
import * as React from "react";
import Board from "./Board";

export interface ITableProps {}

export const MinesweeperTable: React.FC<ITableProps> = (props) => {
  return (
    <Box>
      <Board></Board>
    </Box>
  );
};

export default MinesweeperTable;
