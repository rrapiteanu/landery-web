import React from "react";
import HomepageContent from "../components/ui/HomepageContent/HomepageContent";
import HomepageHeader from "../components/ui/HomepageHeader/HomepageHeader";
import Layout from "../components/ui/Layout/Layout";

const IndexPage = () => {
  return (
    <Layout menuType="relative">
      <HomepageHeader />
      <HomepageContent />
    </Layout>
  );
};

export default IndexPage;
