import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
import React from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  bookingContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    margin: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

function createData(id, property, startDate, endDate) {
  return { id, property, startDate, endDate };
}

export default function BookingList({ bookings = [] }) {
  const classes = useStyles();
  const data = bookings.map((booking) =>
    createData(booking.id, booking.property, booking.startDate, booking.endDate)
  );

  const goToProperty = (id) => {
    console.log(id);
    Router.push(`/property/${id}`);
  };

  return (
    <div className={classes.container}>
      {data.map((row) => (
        <Card className={classes.bookingContainer} key={row.id}>
          <p>Start date: {row.startDate}</p>
          <p>End date: {row.endDate}</p>
          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              goToProperty(row.property.id);
            }}
          >
            Property: {row.property.name}
          </p>
        </Card>
      ))}
    </div>
  );
}
