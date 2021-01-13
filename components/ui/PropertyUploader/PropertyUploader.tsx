import { Checkbox, FormControlLabel, Grid, TextField } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import BathtubIcon from "@material-ui/icons/Bathtub";
import EuroIcon from "@material-ui/icons/Euro";
import HotelIcon from "@material-ui/icons/Hotel";
import LANDLORD_API from "lib/api/landlord";
import firebase from "lib/firebase";
import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import LanderyButton from "../LanderyButton/LanderyButton";
import LoadingIndicator from "../LoadingIndicator";
import ImagesDropzone from "./ImagesDropzone";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function PropertyUploader({ amenities }) {
  const classes = useStyles();

  const { register, handleSubmit, errors, setError } = useForm(); // initialize the hook

  const [selectedAmenities, setSelectedAmenities] = React.useState([]);
  const [pets, setPets] = React.useState(false);

  const handleChange = (event) => {
    setSelectedAmenities(event.target.value);
  };

  const handlePets = (e) => {
    setPets(e.target.checked);
  };

  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState(null);
  const [listing, setListing] = useState(false);

  const onSubmit = async ({
    name,
    description,
    bathrooms,
    bedrooms,
    price,
  }) => {
    try {
      setListing(true);

      console.log(files);
      console.log("upload", uploads);
      const urls = await uploadToGoogle(uploads);

      const res = {
        name,
        description,
        bathrooms,
        bedrooms,
        price,
        pets,
        amenities: selectedAmenities,
        images: urls,
      };

      await LANDLORD_API.uploadProperty(res);

      setListing(false);

      Router.replace("/landlord/listings");
      // uploads convert to urls
      console.log(res);
    } catch (err) {
      setListing(false);

      console.log("errorare");
    }
  };

  const uploadToGoogle = async (files): Promise<string[]> => {
    try {
      let promises = [];

      files.forEach((file) => {
        promises.push(uploadImage(file));
      });

      const urls = await Promise.all(promises);
      return urls;
    } catch (error) {
      throw Error("Failed to upload files");
    }
  };

  const uploadImage = async (file): Promise<string> => {
    try {
      var storageRef = firebase.storage().ref();
      var ref = storageRef.child(`images/${v4()}`);

      const snapshot = await ref.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      console.log(snapshot);

      console.log(downloadURL);
      return downloadURL;
    } catch (error) {}
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUploads(acceptedFiles);

    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    const confirmationMessage = "Changes you made may not be saved.";
    const beforeunloadHandler = (e: BeforeUnloadEvent) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };
    const beforRouteHandler = (url: string) => {
      if (Router.pathname !== url && !confirm(confirmationMessage)) {
        Router.events.emit("routeChangeError");
        throw `Route change to "${url}" was aborted`;
      }
    };
    if (listing) {
      window.addEventListener("beforeunload", beforeunloadHandler);
      Router.events.on("routeChangeStart", beforRouteHandler);
    } else {
      window.removeEventListener("beforeunload", beforeunloadHandler);
      Router.events.off("routeChangeStart", beforRouteHandler);
    }
    return () => {
      window.removeEventListener("beforeunload", beforeunloadHandler);
      Router.events.off("routeChangeStart", beforRouteHandler);
    };
  }, [listing]);

  if (listing) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Please wait...</h1>
          <LoadingIndicator />
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Property Images</h1>
          <p>Drag & drop images</p>

          <ImagesDropzone onDrop={onDrop} files={files} />
        </div>

        <div>
          <h1>Property Details</h1>
          <p>Click text fields to edit the content</p>

          <Grid container spacing={3}>
            <Grid
              style={{ marginTop: 10, marginBottom: 10 }}
              item
              xs={12}
              md={4}
              sm={4}
              lg={3}
            >
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon />
                    </InputAdornment>
                  ),
                }}
                label="Price"
                variant="outlined"
                name="price"
                type="number"
                inputRef={register({
                  required: true,
                  min: 1,
                  valueAsNumber: true,
                })}
                error={errors.price ? true : false}
                helperText={errors.price ? "Price is invalid" : ""}
              />
            </Grid>
            <Grid
              style={{ marginTop: 10, marginBottom: 10 }}
              item
              xs={12}
              md={4}
              sm={4}
              lg={3}
            >
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HotelIcon />
                    </InputAdornment>
                  ),
                }}
                label="Bedrooms"
                variant="outlined"
                name="bedrooms"
                type="number"
                inputRef={register({
                  required: true,
                  min: 1,
                  max: 10,
                  pattern: new RegExp("[0-9*]"),
                  valueAsNumber: true,
                })}
                error={errors.bedrooms ? true : false}
                helperText={errors.bedrooms ? "Needs to be 1-9" : ""}
              />
            </Grid>
            <Grid
              style={{ marginTop: 10, marginBottom: 10 }}
              item
              xs={12}
              md={4}
              sm={4}
              lg={3}
            >
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BathtubIcon />
                    </InputAdornment>
                  ),
                }}
                label="Bathrooms"
                variant="outlined"
                name="bathrooms"
                type="number"
                inputRef={register({
                  required: true,
                  min: 1,
                  max: 10,
                  pattern: new RegExp("[0-9*]"),
                  valueAsNumber: true,
                })}
                error={errors.bathrooms ? true : false}
                helperText={errors.bathrooms ? "Needs to be 1-9" : ""}
              />
            </Grid>
            <Grid
              style={{ marginTop: 10, marginBottom: 10 }}
              item
              xs={12}
              md={4}
              sm={4}
              lg={3}
            >
              <FormControlLabel
                control={
                  <Checkbox checked={pets} onChange={handlePets} name="pets" />
                }
                label="Pets allowed"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid
              style={{ marginTop: 10, marginBottom: 10 }}
              item
              xs={12}
              md={4}
              sm={4}
              lg={3}
            >
              <TextField
                label="Name"
                name="name"
                inputRef={register({ required: true })}
                error={errors.name ? true : false}
                helperText={errors.name ? "Name is invalid" : ""}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid
              style={{ marginTop: 10, marginBottom: 10 }}
              item
              xs={12}
              md={4}
              sm={4}
              lg={3}
            >
              <TextField
                label="Description"
                name="description"
                inputRef={register({ required: true })}
                error={errors.description ? true : false}
                helperText={errors.description ? "Description is invalid" : ""}
              />
            </Grid>
          </Grid>

          <FormControl className={classes.formControl}>
            <InputLabel>Amenities</InputLabel>
            <Select
              multiple
              value={selectedAmenities}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected: any) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {amenities.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Grid container spacing={3}>
          <Grid
            style={{ marginTop: 10, marginBottom: 10 }}
            item
            xs={12}
            md={4}
            sm={4}
            lg={3}
          >
            <LanderyButton color="primary" type="sumbit">
              Save property
            </LanderyButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default PropertyUploader;
