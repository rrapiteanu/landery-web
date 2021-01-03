import Layout from "components/ui/Layout/Layout";
import PropertyInfo from "components/ui/PropertyInfo/PropertyInfo";
import PROPERTIES_API from "lib/api/properties";
import { useIsAuthenticated } from "lib/providers/Auth";
import { Redirect } from "lib/redirect";
import React from "react";

const PropertyPage = ({ property }) => {
  const isAuth = useIsAuthenticated();

  return (
    <Layout>
      <PropertyInfo property={property} isAuth={isAuth} />
    </Layout>
  );
};

PropertyPage.getInitialProps = async (ctx) => {
  const {
    query: { id },
  } = ctx;

  if (!id) {
    Redirect(ctx, "/properties");
  }

  try {
    const resp = await PROPERTIES_API.getProperty(id);

    // [
    //   { startDate: moment(), endDate: moment().add(5, "weeks") },
    //   {
    //     startDate: moment().add(8, "weeks"),
    //     endDate: moment().add(9, "weeks"),
    //   },
    // ]

    return {
      property: {
        ...resp.data,
        amenities: [
          { name: "Kitchen" },
          { name: "Gym" },
          { name: "Wifi" },
          { name: "Pool" },
          { name: "Washer" },
        ],
      },
    };
  } catch (error) {
    Redirect(ctx, "/properties");
  }

  // {
  //   "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lo",
  //   "lat":44.44028,
  //   "name":"Nimman Luxury Suite Rooftop 3 mins to One Nimman",
  //   "pets":true,
  //   "bathrooms":2,
  //   "size":4,
  //   "images":[
  //     "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80",
  //     "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  //     "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80",
  //     "https://images.unsplash.com/photo-1514894780887-121968d00567?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
  //     "https://images.unsplash.com/photo-1496664444929-8c75efb9546f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  //   ],
  //   "bedrooms":2,
  //   "long":26.0275,
  //   "favorite":true,
  //   "rent":11,
  //   "id":2,
  //   "amenitiespairs":[
  //     {"name":"Kitchen"},
  //     {"name":"Gym"},
  //     {"name":"Wifi"},
  //     {"name":"Pool"},
  //     {"name":"Washer"}
  //   ]
  // }
};

export default PropertyPage;
