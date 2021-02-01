import { Text, Center, Box } from "@chakra-ui/react";
import * as React from "react";
import Board from "./Board";

export interface ITableProps {}

export const MinesweeperTable: React.FC<ITableProps> = (props) => {
  return (
    <Center>
      <Box marginTop={5}>
        <Text marginBottom={5} as="h1" fontSize={"xl"}>
          Heezy Minesweeper
        </Text>
        <Board></Board>
      </Box>
    </Center>
  );
};

export default MinesweeperTable;
