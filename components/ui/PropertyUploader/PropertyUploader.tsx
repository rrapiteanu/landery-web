import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
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
import React, { useCallback, useEffect, useState } from "react";
import LanderyButton from "../LanderyButton/LanderyButton";
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

  const [amenityName, setAmenityName] = React.useState([]);
  const handleChange = (event) => {
    setAmenityName(event.target.value);
  };

  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    setUpload(image);
    console.log(image);

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

  return (
    <div>
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
                <Checkbox checked={true} onChange={handleChange} name="pets" />
              }
              label="Pets allowed"
            />{" "}
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
            <TextField label="Name" />
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
            <TextareaAutosize
              rowsMax={6}
              rowsMin={3}
              placeholder="Description"
            />
          </Grid>
        </Grid>

        <FormControl className={classes.formControl}>
          <InputLabel>Amenities</InputLabel>
          <Select
            multiple
            value={amenityName}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => (
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
          <LanderyButton color="primary">Save property</LanderyButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default PropertyUploader;
