import withAuth from "lib/hocs/withAuth";
import * as React from "react";
import Layout from "./../components/ui/Layout/Layout";

const BookingsPage = () => {
  return (
    <Layout title="Account Settings">
      <h1>My bookings</h1>
    </Layout>
  );
};

export default withAuth(BookingsPage);
