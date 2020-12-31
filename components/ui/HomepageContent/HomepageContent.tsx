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
              <h2>Where does it come from?</h2>
              <h4>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock
              </h4>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="sections-1">
        <Grid container direction="row" className="middle-lg middle-md">
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <div className="section">
              <h2>Why do we use it?</h2>
              <h4>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters
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
