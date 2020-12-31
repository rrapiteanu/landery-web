import Grid from "@material-ui/core/Grid";
import Layout from "components/ui/Layout/Layout";
import LoadingIndicator from "components/ui/LoadingIndicator";
import PropertyCard from "components/ui/PropertyCard/PropertyCard";
import PROPERTIES_API from "lib/api/properties";
import React, { useState } from "react";
import styled from "styled-components";

const PageContent = styled(Grid)`
  margin-top: 50px;
`;

const Container = styled.div`
  color: black;
  padding: 20px 20px;
  width: 100%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  h2 {
    padding-left: 10px;
    font-weight: bold;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PropertiesPage = ({ data = [] }) => {
  const [properties, setProperties] = useState(data);

  const fetching = false;

  const addToFavorites = async (property_id) => {
    try {
      await PROPERTIES_API.favoriteProperty(property_id);

      const updated = properties.map((property) => {
        if (property.id === property_id) {
          return {
            ...property,
            favorite: true,
          };
        }
        return property;
      });

      setProperties(updated);
    } catch (error) {}
  };

  const removeFromFavorites = async (property_id) => {
    try {
      await PROPERTIES_API.unfavoriteProperty(property_id);

      const updated = properties.map((property) => {
        if (property.id === property_id) {
          return {
            ...property,
            favorite: false,
          };
        }
        return property;
      });

      setProperties(updated);
    } catch (error) {}
  };

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Container>
          {fetching && (
            <div>
              <LoadingIndicator />
            </div>
          )}

          {properties.length === 0 && !fetching && (
            <div>
              <h2>No properties found</h2>
              <div style={{ height: "calc(100vh - 200px)" }} />
            </div>
          )}

          {properties.length !== 0 && !fetching && (
            <div>
              <TitleContainer>
                <h2>All properties</h2>
              </TitleContainer>
              <Grid container spacing={3}>
                {properties.map((property, index) => (
                  <Grid
                    key={index}
                    style={{ marginTop: 10, marginBottom: 50 }}
                    item
                    xs={12}
                    md={6}
                    sm={6}
                    lg={4}
                  >
                    <PropertyCard
                      {...property}
                      addToFavorites={addToFavorites}
                      removeFromFavorites={removeFromFavorites}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
};

PropertiesPage.getInitialProps = async (ctx) => {
  try {
    const resp = await PROPERTIES_API.getProperties();

    return {
      data: resp.data,
    };

    // return {
    //   properties: [
    //     {
    //       id: 1,
    //       lanlord_id: 446465,
    //       favorite: false, //field care depinde de auth
    //       thumbnailUrl:
    //         "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1934&q=80",
    //       type: "Entire house",
    //       address: "New York",
    //       name: "Beautiful flat in New York!",
    //       location: {
    //         lat: 42,
    //         lng: 23,
    //       },
    //       noBedroom: 1,
    //       imgList: [
    //         "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80",
    //         "https://a0.muscache.com/im/pictures/a139a0fd-efbe-4b16-a5bb-18ec5671fe56.jpg?im_w=1200",
    //       ],
    //       price: 168,
    //     },
    //     {
    //       id: 2,
    //       lanlord_id: 446465,
    //       favorite: false, //field care depinde de auth
    //       thumbnailUrl:
    //         "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1934&q=80",
    //       type: "Entire house",
    //       address: "Amsterdam",
    //       name: "A flat in Amsterdam with a great view",
    //       location: {
    //         lat: 42,
    //         lng: 23,
    //       },
    //       noBedroom: 1,
    //       imgList: [
    //         "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80",
    //         "https://a0.muscache.com/im/pictures/a139a0fd-efbe-4b16-a5bb-18ec5671fe56.jpg?im_w=1200",
    //       ],
    //       price: 168,
    //     },
    //   ],
    // };
  } catch (error) {
    console.log("error", error);
  }
};

export default PropertiesPage;
