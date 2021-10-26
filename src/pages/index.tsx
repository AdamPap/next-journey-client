import { Box, Link, ListItem, UnorderedList } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { useCampgroundsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = useCampgroundsQuery();
  return (
    <>
      <Navbar />
      <Box p={4}>
        <NextLink href="/create-campground">
          <Link color="blue">Create Campground</Link>
        </NextLink>
      </Box>
      <UnorderedList>
        {data ? (
          data.campgrounds.map((camp) => (
            <ListItem key={camp.id}>{camp.name}</ListItem>
          ))
        ) : (
          <div>...loading</div>
        )}
      </UnorderedList>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
