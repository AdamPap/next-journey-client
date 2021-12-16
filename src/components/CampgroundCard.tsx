import { Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { CampgroundsQuery, CurrentUserQuery } from "../generated/graphql";
import { EditDeleteCampgroundButtons } from "./EditDeleteCampgroundButtons";
import { UpvoteSection } from "./UpvoteSection";
import NextImage from "next/image";
import Location from "../icons/Location";
import { CampgroundDate } from "./CampgroundDate";

interface CampgroundCardProps {
  camp: CampgroundsQuery["campgrounds"]["campgrounds"][0];
  userData?: CurrentUserQuery;
}

export const CampgroundCard: React.FC<CampgroundCardProps> = ({
  camp,
  userData,
}) => {
  return (
    <Flex
      p={5}
      rounded="lg"
      shadow="xl"
      // borderWidth="1px"
      key={camp.id}
      backgroundColor={useColorModeValue("gray.100", "gray.700")}
    >
      <UpvoteSection camp={camp} />
      <Box w="100%" py={3}>
        <Flex justifyContent="center" height="full">
          <Box>
            <Flex justifyContent="space-between">
              <NextLink href="campground/[id]" as={`/campground/${camp.id}`}>
                <Link>
                  <Heading fontSize="lg"> {camp.name} </Heading>
                </Link>
              </NextLink>
              <Flex>
                <Box mr={4}>
                  <CampgroundDate timestamp={camp.createdAt} />
                </Box>
                <Text
                  color={
                    camp.creator.id === userData?.currentUser?.id
                      ? useColorModeValue("teal.700", "white")
                      : useColorModeValue("black", "gray.300")
                  }
                >
                  Posted by
                  {camp.creator.id === userData?.currentUser?.id
                    ? " you"
                    : ` ${camp.creator.username}`}
                </Text>
              </Flex>
            </Flex>
            <NextLink href="campground/[id]" as={`/campground/${camp.id}`}>
              <Link>
                <Box
                  mt={3}
                  position="relative"
                  width="100%"
                  maxHeight="600px"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <NextImage
                    src={camp.image}
                    layout="intrinsic"
                    objectFit="contain"
                    width={600}
                    height={400}
                  />
                </Box>
              </Link>
            </NextLink>
            <Box mt={3}>
              <Flex alignItems="center">
                <Box width="100%">
                  <Text>
                    <Location /> {camp.location}
                  </Text>
                </Box>
                {camp.creator.id === userData?.currentUser?.id && (
                  <EditDeleteCampgroundButtons id={camp.id} />
                )}
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
