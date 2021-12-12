import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import { Switch, useColorMode } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const icon = isDark ? <MoonIcon /> : <SunIcon />;

  return (
    <Flex alignItems="center">
      <Box mr={3}>{icon}</Box>
      <Switch
        mr={5}
        colorScheme="teal"
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </Flex>
  );
};
