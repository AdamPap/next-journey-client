import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { Campground } from "../generated/graphql";

interface UpvoteSectionProps {
  camp: Campground;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ camp }) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      mr={4}
    >
      <IconButton
        aria-label="Upvote"
        fontSize="30px"
        // _hover={{ background: "cyan" }}
        icon={<ChevronUpIcon />}
      />
      <Text fontWeight="bold" mb={2} mt={3}>
        {camp.points}
      </Text>
      <IconButton
        aria-label="Downvote"
        fontSize="30px"
        background="whiteAlpha.200"
        // _hover={{ background: "cyan" }}
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
