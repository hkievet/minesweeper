import { Box, Center } from "@chakra-ui/react";
import * as React from "react";
import { MinesweeperTile, MinesweeperTileType } from "../minesweeper";

export interface IEmojiPieceProps {
  tile: MinesweeperTileType;
}

function getEmoji(tile: MinesweeperTileType) {
  switch (tile) {
    case "1":
      return "一";
    case "2":
      return "㆓";
    case "3":
      return "三";
    case "4":
      return "四";
    case "5":
      return "㐅";
    case "6":
      return "六";
    case "7":
      return "七";
    case "8":
      return "⼋";
    case "mt":
      return " ";
    case "bomb":
      return "💣";
    case "flag":
      return "🇹🇩";
    default:
      return "❓";
  }
}

export const EmojiPiece: React.FC<IEmojiPieceProps> = (props) => {
  return (
    <Center
      height="40px"
      width="40px"
      backgroundColor="orange.100"
      border="1px"
      _hover={{
        bgGradient: "linear(to-r, red.500, yellow.500)",
      }}
      as="button"
    >
      {getEmoji(props.tile)}
    </Center>
  );
};

export default EmojiPiece;
