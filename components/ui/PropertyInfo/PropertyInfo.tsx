import BathtubIcon from "@material-ui/icons/Bathtub";
import HotelIcon from "@material-ui/icons/Hotel";
import PetsIcon from "@material-ui/icons/Pets";
import PROPERTIES_API from "lib/api/properties";
import React, { Fragment } from "react";
import styled from "styled-components";
import ImageListItem from "./ImageListItem/ImageListItem";
import PropertyImageSlider from "./PropertyImageSlider/PropertyImageSlider";

const ItemsList = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const About = styled.div`
  line-height: 1.75em;
  font-size: 1.1em;
  text-align: justify;
`;

const PageContainer = styled.div`
  @media only screen and (min-width: 1200px) {
    display: flex;
  }
  margin-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
`;

const LeftContainer = styled.div`
  color: black;
  width: 60%;
  @media only screen and (max-width: 1200px) {
    display: block;
    width: 100%;
  }
`;

const PropertyForm = styled.div`
  position: fixed;
  right: 5%;
  top: 110px;
  padding: 2% 4%;
  background-color: white;
  box-shadow: 1px, 3px, 30px, 2px, rgba(0, 0, 0, 0.2) !important;
  border-radius: 5px;
  width: 30%;
  @media only screen and (max-width: 1200px) {
    display: block;
    width: auto;
    position: relative;
    right: 0%;
    top: 0px;
    margin: 5%;
  }
`;

const ServicesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0px;
`;

// const isAuth = useIsAuthenticated();

class PropertyInfo extends React.Component<any, any> {
  state = {
    info: this.props.property,
  };

  addToFavorites = async () => {
    try {
      await PROPERTIES_API.favoriteProperty(this.state.info.id);
      this.setState({ info: { ...this.state.info, favorite: true } });
    } catch (error) {}
  };

  removeFromFavorites = async () => {
    try {
      await PROPERTIES_API.unfavoriteProperty(this.state.info.id);
      this.setState({ info: { ...this.state.info, favorite: false } });
    } catch (error) {}
  };

  render() {
    const prop = {
      imgList: this.state.info.images ? this.state.info.images : [],
      name: this.state.info.display,
      noBedroom: this.state.info.size,
      price: this.state.info.rent,
    };

    const amenities = this.state.info.amenitiespairs
      ? this.state.info.amenitiespairs.map((x, i) => (
          <div key={i} style={{ margin: "10px 0px", width: "50%" }}>
            <ImageListItem text={x.name} />
          </div>
        ))
      : "";

    return (
      <div>
        <PageContainer>
          <LeftContainer>
            <PropertyImageSlider
              {...prop}
              isAuth={this.props.isAuth}
              favorite={this.state.info.favorite}
              addToFavorites={this.addToFavorites}
              removeFromFavorites={this.removeFromFavorites}
            />

            <h1>{prop.name}</h1>

            <ServicesContainer>
              <div>
                <HotelIcon
                  style={{
                    display: "block",
                    width: 65,
                    height: 65,
                    fontSize: 60,
                    marginBottom: 10,
                    margin: "0px auto",
                  }}
                />
                <span>
                  {this.state.info.size}{" "}
                  {this.state.info.size > 1 ? "bedrooms" : "bedroom"}
                </span>
              </div>
              <div>
                <BathtubIcon
                  style={{
                    display: "block",
                    width: 65,
                    height: 65,
                    fontSize: 60,
                    marginBottom: 10,
                    margin: "0px auto",
                  }}
                />
                <span>
                  {this.state.info.bathrooms}{" "}
                  {this.state.info.bathrooms > 1 ? "bathrooms" : "bathroom"}
                </span>
              </div>
              <div>
                {this.state.info.pets && (
                  <Fragment>
                    <PetsIcon
                      style={{
                        display: "block",
                        width: 65,
                        height: 65,
                        fontSize: 60,
                        marginBottom: 10,
                        margin: "0px auto",
                      }}
                    />
                    <span>Pets allowed</span>
                  </Fragment>
                )}
                {!this.state.info.pets && (
                  <Fragment>
                    <PetsIcon
                      style={{
                        display: "block",
                        width: 65,
                        height: 65,
                        fontSize: 60,
                        marginBottom: 10,
                        margin: "0px auto",
                      }}
                    />
                    <span>Pets not allowed</span>
                  </Fragment>
                )}
              </div>
            </ServicesContainer>

            <h2>About</h2>
            <About>{this.state.info.description}</About>

            {this.state.info.amenitiespairs &&
              this.state.info.amenitiespairs.length !== 0 && (
                <div>
                  <h2>Amenities</h2>
                  <ItemsList>{amenities}</ItemsList>
                </div>
              )}
          </LeftContainer>
        </PageContainer>

        <PropertyForm>
          <h1>{prop.price}€</h1>
        </PropertyForm>
      </div>
    );
  }
}

export default PropertyInfo;
