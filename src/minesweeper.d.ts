export interface Minesweeper {
  board: MinesweeperTile[][];
  config: MinesweeperOptions;
}

export interface MinesweeperOptions {
  boardWidth: number;
  boardHeight: number;
  numBombs: number;
}

export interface MinesweeperTile {
  revealed: boolean;
  type: MinesweeperTileType;
}

type MinesweeperTileType = "mt" | "flag" | "bomb" | NumberTileType;
type NumberTileType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

type = "empty" | "flag" | "bomb" | "number";
