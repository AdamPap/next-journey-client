import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { Navbar } from "./Navbar";
import Wrapper, { WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  const bg = useColorModeValue("gray.50", "gray.800");
  return (
    <Box
      backgroundColor={bg}
      minHeight="100vh"
      color={useColorModeValue("black", "gray.200")}
    >
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </Box>
  );
};
