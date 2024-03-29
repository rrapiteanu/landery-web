import { Grid } from "@material-ui/core";
import LoadingIndicator from "components/ui/LoadingIndicator";
import PropertyCard from "components/ui/PropertyCard/PropertyCard";
import PROPERTIES_API from "lib/api/properties";
import withAuth from "lib/hocs/withAuth";
import React, { useState } from "react";
import styled from "styled-components";
import Layout from "./../components/ui/Layout/Layout";

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

const fetching = false;

const FavoritesPage = ({ properties }) => {
  const [favorites, setFavorites] = useState(properties);

  const removeFromFavorites = async (property_id) => {
    try {
      await PROPERTIES_API.unfavoriteProperty(property_id);

      const updated = favorites.filter(
        (favorite) => favorite.id !== property_id
      );

      setFavorites(updated);
    } catch (error) {}
  };

  return (
    <Layout title="Account Settings">
      <div style={{ display: "flex" }}>
        <Container>
          {fetching && (
            <div>
              <LoadingIndicator />
            </div>
          )}

          {favorites.length === 0 && !fetching && (
            <div>
              <h2>No properties found</h2>
              <div style={{ height: "calc(100vh - 200px)" }} />
            </div>
          )}

          {favorites.length !== 0 && !fetching && (
            <div>
              <TitleContainer>
                <h2>Favorites</h2>
              </TitleContainer>
              <Grid container spacing={3}>
                {favorites.map((property, index) => (
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
                      favorite={true}
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

FavoritesPage.getInitialProps = async (ctx) => {
  try {
    const resp = await PROPERTIES_API.getFavorites();

    return {
      properties: resp.data.map((property) => {
        return {
          ...property,
        };
      }),
    };
  } catch (error) {
    console.log("error", error);
    return {
      properties: [],
    };
  }
};

export default withAuth(FavoritesPage);
