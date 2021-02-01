import { Box } from "@chakra-ui/react";
import * as React from "react";
import EmojiPiece from "./BoardPieces/EmojiPiece";
import UnrevealedPiece from "./BoardPieces/UnrevealedPiece";
import { MinesweeperTileType, OverlayState } from "./minesweeper";

export interface IBoardTileProps {
  tile: MinesweeperTileType;
  visible: OverlayState;
  onClick: () => void;
  onRightClick: () => void;
}

export const BoardTile: React.FC<IBoardTileProps> = (props) => {
  if (props.visible === "unrevealed") {
    return (
      <Box
        onClick={props.onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          props.onRightClick();
        }}
      >
        <UnrevealedPiece></UnrevealedPiece>
      </Box>
    );
  } else if (props.visible === "flagged") {
    return (
      <Box
        onClick={props.onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          props.onRightClick();
        }}
      >
        <EmojiPiece tile={"flag"}></EmojiPiece>
      </Box>
    );
  }

  return (
    <Box
      onClick={props.onClick}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <EmojiPiece tile={props.tile}></EmojiPiece>
    </Box>
  );
};

export default BoardTile;
