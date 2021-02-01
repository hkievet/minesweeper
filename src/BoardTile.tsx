import { Box } from "@chakra-ui/react";
import * as React from "react";
import EmojiPiece from "./BoardPieces/EmojiPiece";
import { MinesweeperTile, MinesweeperTileType } from "./minesweeper";

export interface IBoardTileProps {
  tile: MinesweeperTileType;
  onClick: () => void;
}

export const BoardTile: React.FC<IBoardTileProps> = (props) => {
  return (
    <Box onClick={props.onClick}>
      <EmojiPiece tile={props.tile}></EmojiPiece>
    </Box>
  );
};

export default BoardTile;
