import { Box } from "@chakra-ui/layout";
import React from "react";

interface ErrorProps {
  tokenError: string;
}

function Error({ tokenError }: ErrorProps) {
  return (
    <Box pt={2} fontSize="sm" fontWeight="thin" color="tomato">
      {tokenError}
    </Box>
  );
}

export default Error;
