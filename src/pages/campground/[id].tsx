import React, { useEffect, useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import {
  useCampgroundQuery,
  useCurrentUserQuery,
} from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { EditDeleteCampgroundButtons } from "../../components/EditDeleteCampgroundButtons";
import NextImage from "next/image";
import { isServer } from "../../utils/isServer";
import LikeIcon from "../../icons/LikeIcon";
import DislikeIcon from "../../icons/DislikeIcon";
import Location from "../../icons/Location";
import { CampgroundDate } from "../../components/CampgroundDate";
import { DragHandleIcon } from "@chakra-ui/icons";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationIcon from "../../icons/LocationIcon";

const Campground: React.FC = ({}) => {
  const router = useRouter();

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 12,
    // mapStyle: "mapbox://styles/mapbox/dark-v10",
  });

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ fetching, data, error }] = useCampgroundQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  const [{ data: userData }] = useCurrentUserQuery({
    // NOTE: the query is not gonna run on the server
    // because we don't need it. CurrentUser doesn't affect
    // SEO
    pause: isServer(),
  });

  useEffect(() => {
    if (data?.campground) {
      setViewport({
        latitude: data?.campground?.latitude,
        longitude: data?.campground?.longitude,
        zoom: 12,
      });
    }
  }, [data?.campground]);

  if (fetching) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (!data?.campground) {
    return <Box>Could not find campground</Box>;
  }

  return (
    <Layout variant="regular">
      <Flex
        mt={8}
        justifyContent="center"
        flexDirection="column"
        alignItems="flex-start"
        px={4}
      >
        <Flex justifyContent="space-between" alignItems="flex-end" width="100%">
          <Heading>{data?.campground?.name}</Heading>
          <Flex>
            <Box mr={4}>
              <CampgroundDate timestamp={data?.campground.createdAt} />
            </Box>
            <Text
              color={
                data?.campground?.creator.id === userData?.currentUser?.id
                  ? `teal`
                  : "black"
              }
            >
              Posted by
              {data?.campground?.creator.id === userData?.currentUser?.id
                ? " you"
                : ` ${data?.campground?.creator.username}`}
            </Text>
          </Flex>
        </Flex>
        <Box
          mt={3}
          position="relative"
          width="100%"
          maxHeight="500px"
          height="500px"
          borderRadius="md"
          overflow="hidden"
        >
          <NextImage
            src={data?.campground.image}
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </Box>
        <Flex
          my={3}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Flex py={2} fontSize="1.2rem" alignItems="center">
            {data.campground.points >= 0 ? <LikeIcon /> : <DislikeIcon />}
            <Box mt={2} ml={2}>
              {data.campground.points}
            </Box>
            <Box ml={6}>
              <Location /> {data?.campground?.location}
            </Box>
          </Flex>

          {data.campground.creatorId === userData?.currentUser?.id && (
            <EditDeleteCampgroundButtons id={data.campground.id} />
          )}
        </Flex>
        <Box
          width="100%"
          // position="relative"
          mb={6}
          rounded="md"
          overflow="hidden"
        >
          <ReactMapGL
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            {...viewport}
            width="100%"
            height="300px"
            pitch={45}
            onViewportChange={(nviewport: any) => setViewport(nviewport)}
            mapStyle="mapbox://styles/adampap/ckx8z4py00rr114qpdeaekhl8/draft"
          >
            <Marker
              latitude={data.campground.latitude}
              longitude={data.campground.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Box fontSize="2rem">
                <LocationIcon />
              </Box>
            </Marker>
          </ReactMapGL>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Campground);
