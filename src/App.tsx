import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import MinesweeperTable from "./MineSweeperTable";

function App() {
  return (
    <ChakraProvider>
      <MinesweeperTable />
    </ChakraProvider>
  );
}

export default App;
