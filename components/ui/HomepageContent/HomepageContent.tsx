import Grid from "@material-ui/core/Grid";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 100px;
  .sections-1 {
    margin-bottom: 240px;
    @media only screen and (max-width: 1000px) {
      margin-bottom: 20px;
    }
    .home-image-right {
      height: 230px;
      margin-right: 205px;
      @media only screen and (max-width: 960px) {
        display: none;
      }
    }
    .home-image-left {
      height: 230px;
      margin-left: 205px;
      @media only screen and (max-width: 960px) {
        display: none;
      }
    }
    h4 {
      line-height: 30px;
      font-size: 20px;
      font-weight: 400;
    }
    .section {
      padding-left: 50px;
      margin: 0 auto;
      color: $primaryGrey;
      max-width: 500px;
      @media only screen and (max-width: 1400px) {
        max-width: 350px;
      }
      h2 {
        position: relative;
        display: inline;
        font-weight: 500;
      }
    }
  }
`;

const HomepageContent = () => {
  return (
    <Container>
      <div className="sections-1">
        <Grid container direction="row">
          <Grid item lg={4} md={4} sm={12} xs={12}></Grid>

          <Grid item lg={8} md={8} sm={12} xs={12}>
            <div className="section">
              <h2>How it Works?</h2>
              <h4>
                Browse awesome apartments all over the city. Fill out your
                profile and we'll find you the best options.
              </h4>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="sections-1">
        <Grid container direction="row" className="middle-lg middle-md">
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <div className="section">
              <h2>Why host on Landery?</h2>
              <h4>
                No matter what kind of home or room you have to share, Landery
                makes it simple and secure to host travelers. You’re in full
                control of your availability, prices, house rules, and how you
                interact with guests.
              </h4>
            </div>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}></Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default HomepageContent;
