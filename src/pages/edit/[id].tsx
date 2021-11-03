import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface EditCampgroundProps {}

const EditCampground: React.FC<EditCampgroundProps> = ({}) => {
  return <div>Edit campground</div>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(EditCampground);
