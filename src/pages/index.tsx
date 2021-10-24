import { ListItem, UnorderedList } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { useCampgroundsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = useCampgroundsQuery();
  return (
    <>
      <Navbar />
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
