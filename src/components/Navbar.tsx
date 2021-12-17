import { Box, Divider, Flex, Heading, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useCurrentUserQuery, useLogoutMutation } from "../generated/graphql";
import { Button, IconButton } from "@chakra-ui/button";
import { isServer } from "../utils/isServer";
import router from "next/router";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { UserIcon } from "../icons/UserIcon";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import Wrapper from "./Wrapper";
import { MenuDivider } from "@chakra-ui/react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const bg = useColorModeValue("gray.50", "gray.900");

  const [{ data, fetching }] = useCurrentUserQuery({
    // NOTE: the query is not gonna run on the server
    // because we don't need it. CurrentUser doesn't affect
    // SEO
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body;
  fetching
    ? (body = null)
    : data?.currentUser
    ? (body = (
        <Menu placement="bottom-end">
          <MenuButton as={IconButton} icon={<UserIcon />} borderRadius="50%" />
          <MenuList>
            <Box py={2} px={3} fontWeight="bold">
              {data?.currentUser?.name}
            </Box>
            <MenuDivider />
            <MenuItem>
              <Box mr={4} display={{ base: "block", sm: "none" }}>
                <DarkModeSwitch />
              </Box>
            </MenuItem>
            <MenuItem
              isLoading={logoutFetching}
              onClick={async () => {
                await logout();
                router.reload();
              }}
              // ml={2}
              variant="link"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ))
    : (body = (
        <Flex justifyContent="flex-end" alignItems="center">
          <Box mr={4} display={{ base: "none", sm: "block" }}>
            <NextLink href="/register">
              <Link>Sign Up</Link>
            </NextLink>
          </Box>
          <NextLink href="login">
            <Button as={Link} colorScheme="teal">
              Sign In
            </Button>
          </NextLink>
        </Flex>
      ));

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={100}
      p={{ base: 0, md: 4 }}
      // borderBottomWidth={1}
      // borderColor="teal.200"
      display="flex"
      alignItems="center"
      // justifyContent="flex-end"
      shadow="md"
      backgroundColor={bg}
      minHeight="10vh"
    >
      <Box mx="auto" w="100%" px={4}>
        <Flex
          p={2}
          justifyContent="space-between"
          alignItems="center"
          width="full"
        >
          <NextLink href="/">
            <Link mb={-2} style={{ textDecoration: "none" }}>
              <Heading>NextJourney</Heading>
            </Link>
          </NextLink>
          <Flex justifyContent="right" alignItems="center">
            <Box mr={4} display={{ base: "none", sm: "block" }}>
              <DarkModeSwitch />
            </Box>
            {body}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
