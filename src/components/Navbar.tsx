import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useCurrentUserQuery, useLogoutMutation } from "../generated/graphql";
import { Button } from "@chakra-ui/button";
import { isServer } from "../utils/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
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
          <Flex justifyContent="right">
            <Box>{data?.currentUser?.name}</Box>
            <Button
              isLoading={logoutFetching}
              onClick={() => logout()}
              ml={2}
              variant="link"
            >
              Logout
            </Button>
          </Flex>
        </Flex>
      ))
    : (body = (
        <>
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </>
      ));

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={100}
      p={4}
      bg="tomato"
      display="flex"
      justifyContent="flex-end"
    >
      {body}
    </Box>
  );
};
