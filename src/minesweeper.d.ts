export interface Minesweeper {
  tiles: MinesweeperTileType[][];
  revealed: OverlayState[][];
}

export interface MinesweeperOptions {
  boardWidth: number;
  boardHeight: number;
  numBombs: number;
}

type MinesweeperTileType = "mt" | "flag" | "bomb" | NumberTileType;
type NumberTileType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

type OverlayState = "revealed" | "unrevealed" | "flagged";

type = "empty" | "flag" | "bomb" | "number";
