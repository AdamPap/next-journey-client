import { Box } from "@chakra-ui/layout";
import React from "react";

export type WrapperVariant = "small" | "regular" | "full";

interface WrapperProps {
  variant?: WrapperVariant;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "full" }) => {
  return (
    <Box
      mx="auto"
      maxW={
        variant === "regular" ? "900px" : variant === "small" ? "400px" : "100%"
      }
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
