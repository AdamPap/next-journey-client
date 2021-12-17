import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { CampgroundsQuery, useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  camp: CampgroundsQuery["campgrounds"]["campgrounds"][0];
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ camp }) => {
  const [loading, setLoading] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();

  return (
    <Flex flexDirection="column" alignItems="center" mr={4}>
      <IconButton
        aria-label="Upvote"
        fontSize="30px"
        size={useBreakpointValue(["sm", "md"])}
        icon={<ChevronUpIcon />}
        isLoading={loading === "upvote-loading"}
        colorScheme={camp.voteStatus === 1 ? "teal" : undefined}
        onClick={async () => {
          if (camp.voteStatus === 1) {
            return;
          }
          setLoading("upvote-loading");
          await vote({
            value: 1,
            campgroundId: camp.id,
          });
          setLoading("not-loading");
        }}
      />
      <Text fontWeight="bold" mb={2} mt={3}>
        {camp.points}
      </Text>
      <IconButton
        aria-label="Downvote"
        fontSize="30px"
        size={useBreakpointValue(["sm", "md"])}
        icon={<ChevronDownIcon />}
        isLoading={loading === "downvote-loading"}
        colorScheme={camp.voteStatus === -1 ? "red" : undefined}
        onClick={async () => {
          if (camp.voteStatus === -1) {
            return;
          }
          setLoading("downvote-loading");
          await vote({
            value: -1,
            campgroundId: camp.id,
          });
          setLoading("not-loading");
        }}
      />
    </Flex>
  );
};
