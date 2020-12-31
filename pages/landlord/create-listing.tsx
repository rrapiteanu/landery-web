import Layout from "components/ui/Layout/Layout";
import PropertyUploader from "components/ui/PropertyUploader/PropertyUploader";
import withAuth from "lib/hocs/withAuth";
import React from "react";

const amenities = [
  "air conditioning",
  "bar",
  "bike storage",
  "cinema",
  "concierge",
  "electricity included",
  "gas included",
  "internet",
  "outside area",
  "parking",
];

const CreateListingPage = () => {
  return (
    <Layout>
      <PropertyUploader amenities={amenities} />
    </Layout>
  );
};

export default withAuth(CreateListingPage);
