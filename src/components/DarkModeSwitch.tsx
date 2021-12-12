import { useColorMode, Switch } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box>
      <Switch
        // position="fixed"
        // top="1rem"
        // right="1rem"
        mr={3}
        color="teal"
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </Box>
  );
};
