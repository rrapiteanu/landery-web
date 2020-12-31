import LanderyButton from "components/ui/LanderyButton/LanderyButton";
import Layout from "components/ui/Layout/Layout";
import withAuth from "lib/hocs/withAuth";
import Router from "next/router";
import React from "react";

const ListingsPage = () => {
  return (
    <Layout>
      <div>
        My listings
        <LanderyButton
          type="submit"
          color="primary"
          onClick={() => {
            Router.push("/landlord/create-listing");
          }}
        >
          Create listing
        </LanderyButton>
      </div>
    </Layout>
  );
};

export default withAuth(ListingsPage);
