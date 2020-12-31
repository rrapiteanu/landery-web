import { makeStyles, Paper } from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import React from "react";
import { useDropzone } from "react-dropzone";
//@ts-ignore

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "180px",
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed lightgrey",
    cursor: "pointer",
  },
}));

function ImagesDropzone({ disabled = false, files, onDrop }) {
  const classes = useStyles({});

  const thumbs = files.map((file) => (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 2,
        marginBottom: 8,
        marginRight: 8,
        width: 160,
        height: 160,
        padding: 4,
        boxSizing: "border-box",
      }}
      key={file.name}
    >
      <div style={{ display: "flex", minWidth: 0, overflow: "hidden" }}>
        <img
          src={file.preview}
          style={{ display: "block", width: "auto", height: "100%" }}
        />
      </div>
    </div>
  ));

  const { getRootProps, getInputProps } = useDropzone({
    disabled: disabled,
    accept: "image/jpeg, image/png",
    onDrop,
  });
  const { ref, ...rootProps } = getRootProps();

  return (
    <RootRef rootRef={ref}>
      <Paper {...rootProps} elevation={0} className={classes.paper}>
        <input {...getInputProps()} />
        {thumbs.length === 0 && (
          <p style={{ color: "grey" }}>
            Drag and drop images here or browse them.
          </p>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 16,
          }}
        >
          {thumbs}
        </div>
      </Paper>
    </RootRef>
  );
}

export default ImagesDropzone;
