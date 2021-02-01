import { Box } from "@chakra-ui/react";
import * as React from "react";
import EmojiPiece from "./BoardPieces/EmojiPiece";
import { MinesweeperTile } from "./minesweeper";

export interface IBoardTileProps {
  tile: MinesweeperTile;
}

export const BoardTile: React.FC<IBoardTileProps> = (props) => {
  return (
    <Box>
      <EmojiPiece tile={props.tile}></EmojiPiece>
    </Box>
  );
};

export default BoardTile;
