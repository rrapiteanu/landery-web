import { IconButton, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import LanderyButton from "components/ui/LanderyButton/LanderyButton";
import LoadingIndicator from "components/ui/LoadingIndicator";
import BOOKING_API from "lib/api/booking";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import React, { Fragment, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const moment = extendMoment(Moment);

const useStyles = makeStyles((theme) => ({
  pageCard: {
    margin: 10,
    cursor: "pointer",
    "&:hover": {
      background: "grey",
    },
  },
  title: {
    fontSize: 14,
  },
  root: {},
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles({});

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const BookPropertyDialog = ({ bookProperty, id, loadingBooking }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [focusedInput, setfocusedInput] = useState(null);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const loading = loadingBookings || loadingBooking;

  const handleSubmit = async () => {
    try {
      if (!startDate || !endDate) {
        throw Error("Select dates");
      }
      await bookProperty(startDate, endDate);
      handleClose();
    } catch (error) {
      setError(error.message);
      console.log("error", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    getBookings();
  };

  const getBookings = async () => {
    setLoadingBookings(true);

    try {
      const resp = await BOOKING_API.getBookingsForProperty(id);
      setBookings(resp.data);
      setLoadingBookings(false);
    } catch (error) {
      setLoadingBookings(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setstartDate(null);
    setendDate(null);
    setfocusedInput(null);
    setOpen(false);
  };

  const isBlocked = (date) => {
    let bookedRanges = [];
    let blocked;
    bookings.map((booking) => {
      bookedRanges = [
        ...bookedRanges,
        moment().range(booking.startDate, booking.endDate),
      ];
    });

    blocked = bookedRanges.find((range) => range.contains(date));
    return blocked;
  };

  return (
    <div>
      <LanderyButton
        type="submit"
        fullWidth
        color="primary"
        onClick={handleOpen}
      >
        Book property
      </LanderyButton>

      <Dialog
        // fullScreen
        fullWidth
        onClose={handleClose}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle onClose={handleClose}>Book property</DialogTitle>
        <Fragment>
          <DialogContent
            style={{
              minHeight: 500,
              display: "flex",
              flexDirection: "column",
              minWidth: "100%",
              padding: 20,
            }}
          >
            {loading && <LoadingIndicator />}
            {!loading && (
              <Fragment>
                <DateRangePicker
                  transitionDuration={0}
                  isDayBlocked={isBlocked}
                  startDateId="startDate"
                  endDateId="endDate"
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={({ startDate, endDate }) => {
                    setstartDate(startDate);
                    setendDate(endDate);
                  }}
                  focusedInput={focusedInput}
                  numberOfMonths={1}
                  onFocusChange={(focusedInput) => {
                    setfocusedInput(focusedInput);
                  }}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </Fragment>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={loadingBooking}
            >
              Book property
            </Button>
          </DialogActions>
        </Fragment>
      </Dialog>
    </div>
  );
};
export default BookPropertyDialog;
