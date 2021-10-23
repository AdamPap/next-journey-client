import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import Link from "next/link";
import { useCurrentUserQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/button";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useCurrentUserQuery();

  let body;
  fetching
    ? (body = null)
    : data?.currentUser
    ? (body = (
        <Flex justifyContent="right">
          <Box>{data?.currentUser?.name}</Box>
          <Button ml={2} variant="link">
            Logout
          </Button>
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
    <Box p={4} bg="tomato" display="flex" justifyContent="space-around">
      {body}
    </Box>
  );
};
