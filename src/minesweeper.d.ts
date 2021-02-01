export interface Minesweeper {
  board: MinesweeperTile[][];
  config: MinesweeperOptions;
}

export interface MinesweeperOptions {
  boardWidth: number;
  boardHeight: number;
  numBombs: number;
}

type MinesweeperTile = "mt" | "flag" | "bomb" | NumberTile;
type NumberTile = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

type = "empty" | "flag" | "bomb" | "number";
