import { Center } from "@chakra-ui/react";
import * as React from "react";

export interface IUnrevealedPieceProps {}

export const UnrevealedPiece: React.FC<IUnrevealedPieceProps> = (props) => {
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
      {" "}
    </Center>
  );
};

export default UnrevealedPiece;
