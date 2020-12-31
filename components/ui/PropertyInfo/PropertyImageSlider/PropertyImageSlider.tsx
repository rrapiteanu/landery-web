import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React from "react";
import Carousel from "react-material-ui-carousel";

function Item({ item }) {
  return (
    <div
      style={{
        height: 600,
        background: `url(${item.src})`,
        backgroundSize: "cover",
      }}
    ></div>
  );
}

class PropertyImageSlider extends React.Component<any, any> {
  toggleFavorites = () => {
    if (this.props.favorite === false) {
      this.props.addToFavorites();
    } else {
      this.props.removeFromFavorites();
    }
  };

  render() {
    return (
      <div style={{ color: "black", position: "relative", width: "100%" }}>
        <div style={{ position: "relative" }}>
          {this.props.isAuth && (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={{
                position: "absolute",
                right: 20,
                top: 20,
                zIndex: 1,
              }}
              onClick={this.toggleFavorites}
            >
              <FavoriteIcon
                style={{ display: this.props.favorite ? "none" : "block" }}
              />
              <FavoriteBorderIcon
                style={{ display: this.props.favorite ? "block" : "none" }}
              />
              <span style={{ marginLeft: 3 }}>Favorite</span>
            </Button>
          )}
        </div>
        <Carousel indicators navButtonsAlwaysVisible timeout={100}>
          {this.props.imgList.map((src, i) => (
            <Item key={i} item={{ src }} />
          ))}
        </Carousel>
      </div>
    );
  }
}

export default PropertyImageSlider;
