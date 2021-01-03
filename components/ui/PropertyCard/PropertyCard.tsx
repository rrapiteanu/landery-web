import Link from "@material-ui/core/Link";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useIsAuthenticated } from "lib/providers/Auth";
import React, { Fragment, useState } from "react";

const PropertyCard = (props) => {
  // state = {
  //   activeSlideNumber: 0,
  // };

  const [activeSlideNumber, setActiveSlideNumber] = useState(0);

  const nextSlide = () =>
    setActiveSlideNumber((activeSlideNumber + 1) % props.images.length);

  const prevSlide = () =>
    setActiveSlideNumber(
      (activeSlideNumber - 1 + props.images.length) % props.images.length
    );

  const isSingleSlide = () => props.images.length === 1;

  const toggleFavorites = () => {
    if (!props.favorite) {
      props.addToFavorites(props.id);
    } else {
      props.removeFromFavorites(props.id);
    }
  };

  const slidesStyles = props.images.map((src, i) =>
    i === activeSlideNumber ? { opacity: 1 } : { opacity: 0 }
  );
  const dotsStyles = props.images.map((src, i) =>
    i === activeSlideNumber
      ? { opacity: 1, width: 10, height: 10 }
      : { opacity: 0.7 }
  );

  const slides = props.images.map(
    (image, i) =>
      (i === activeSlideNumber ||
        i === (activeSlideNumber + 1) % props.images.length ||
        i ===
          (activeSlideNumber + props.images.length - 1) %
            props.images.length) && (
        <img
          className="slide"
          src={image.url}
          key={"slide_" + i}
          onError={(e: any) => {
            e.target.src = "/placeholder.png";
          }}
          style={slidesStyles[i]}
        />
      )
  );

  const isAuth = useIsAuthenticated();

  const dots = props.images.map((src, i) => (
    <div className="dot" key={"dot_" + i} style={dotsStyles[i]} />
  ));

  return (
    <div className="property-card">
      <div className="controlls">
        {isAuth && !props.disableFavorite && props.name && (
          <Fragment>
            <div
              style={{ display: props.favorite ? "none" : "block" }}
              className="heart"
              onClick={toggleFavorites}
            >
              <FavoriteBorderIcon />
            </div>

            <div
              style={{ display: props.favorite ? "block" : "none" }}
              className="heart"
              onClick={toggleFavorites}
            >
              <FavoriteIcon />
            </div>
          </Fragment>
        )}

        {!isSingleSlide() && (
          <div>
            <div className="prev-slide">
              <ChevronLeftIcon onClick={prevSlide} />
            </div>
            <div className="next-slide">
              <ChevronRightIcon onClick={nextSlide} />
            </div>
            <div className="dots">{dots}</div>
          </div>
        )}
        <img src={"/placeholder.png"} className="placeholder" />
      </div>
      <Link href={`/property/${props.id}`}>
        <Fragment>{slides}</Fragment>

        {/* fields */}
        {!props.noContent && (
          <div className="fields">
            <div className="no-bedroom">{props.bedrooms} BEDROOM</div>
            <div className="name">{props.name}</div>
            <div className="price">{props.price}€ per day</div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default PropertyCard;
