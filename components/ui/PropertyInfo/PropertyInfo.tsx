import BathtubIcon from "@material-ui/icons/Bathtub";
import HotelIcon from "@material-ui/icons/Hotel";
import PetsIcon from "@material-ui/icons/Pets";
import BookPropertyDialog from "components/modals/BookPropertyDialog";
import BOOKING_API from "lib/api/booking";
import PROPERTIES_API from "lib/api/properties";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import Router from "next/router";
import React, { Fragment } from "react";
import styled from "styled-components";
import LanderyButton from "../LanderyButton/LanderyButton";
import ImageListItem from "./ImageListItem/ImageListItem";
import PropertyImageSlider from "./PropertyImageSlider/PropertyImageSlider";

const moment = extendMoment(Moment);

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
    loadingBooking: false,
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

  bookProperty = async (startDate, endDate) => {
    this.setState({ ...this.state, loadingBooking: true });

    try {
      await BOOKING_API.bookProperty(this.state.info.id, startDate, endDate);
      this.setState({ ...this.state, loadingBooking: false });
    } catch (error) {
      this.setState({ ...this.state, loadingBooking: false });
      throw Error("Failed to book");
    }
  };

  goToLogin = () => {
    Router.push("/login");
  };

  render() {
    return (
      <div>
        <PageContainer>
          <LeftContainer>
            <PropertyImageSlider
              images={this.state.info.images}
              isAuth={this.props.isAuth}
              favorite={this.state.info.favorite}
              addToFavorites={this.addToFavorites}
              removeFromFavorites={this.removeFromFavorites}
            />

            <h1>{this.state.info.name}</h1>

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
                  {this.state.info.bedrooms}{" "}
                  {this.state.info.bedrooms > 1 ? "bedrooms" : "bedroom"}
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

            {this.state.info.amenities &&
              this.state.info.amenities.length !== 0 && (
                <div>
                  <h2>Amenities</h2>
                  <ItemsList>
                    {this.state.info.amenities.map((x, i) => (
                      <div key={i} style={{ margin: "10px 0px", width: "50%" }}>
                        <ImageListItem text={x.name} />
                      </div>
                    ))}
                  </ItemsList>
                </div>
              )}
          </LeftContainer>
        </PageContainer>

        <PropertyForm>
          <h1>{this.state.info.price}€</h1>

          {this.props.isAuth && (
            <BookPropertyDialog
              id={this.state.info.id}
              bookProperty={this.bookProperty}
              loadingBooking={this.state.loadingBooking}
            />
          )}
          {!this.props.isAuth && (
            <LanderyButton
              type="submit"
              fullWidth
              color="primary"
              onClick={this.goToLogin}
            >
              Login to book it
            </LanderyButton>
          )}
        </PropertyForm>
      </div>
    );
  }
}

export default PropertyInfo;
