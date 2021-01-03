import LanderyButton from "components/ui/LanderyButton/LanderyButton";
import Layout from "components/ui/Layout/Layout";
import PropertyList from "components/ui/PropertyList";
import LANDLORD_API from "lib/api/landlord";
import withAuth from "lib/hocs/withAuth";
import Router from "next/router";
import React from "react";

// const properties = [
//   {
//     id: 1,
//     lanlord_id: 446465,
//     favorite: false, //field care depinde de auth
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1934&q=80",
//     type: "Entire house",
//     address: "New York",
//     name: "Beautiful flat in New York!",
//     location: {
//       lat: 42,
//       lng: 23,
//     },
//     noBedroom: 1,
//     imgList: [
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80",
//       "https://a0.muscache.com/im/pictures/a139a0fd-efbe-4b16-a5bb-18ec5671fe56.jpg?im_w=1200",
//     ],
//     price: 168,
//   },
//   {
//     id: 2,
//     lanlord_id: 446465,
//     favorite: false, //field care depinde de auth
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1934&q=80",
//     type: "Entire house",
//     address: "Amsterdam",
//     name: "A flat in Amsterdam with a great view",
//     location: {
//       lat: 42,
//       lng: 23,
//     },
//     noBedroom: 1,
//     imgList: [
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80",
//       "https://a0.muscache.com/im/pictures/a139a0fd-efbe-4b16-a5bb-18ec5671fe56.jpg?im_w=1200",
//     ],
//     price: 168,
//   },
// ];

const ListingsPage = ({ properties }) => {
  return (
    <Layout>
      <div>
        <h1>My listings</h1>

        <PropertyList properties={properties} />
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

ListingsPage.getInitialProps = async (ctx) => {
  try {
    const resp = await LANDLORD_API.getListings();

    return {
      properties: resp.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      properties: [],
    };
  }
};

export default withAuth(ListingsPage);
