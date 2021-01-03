import BookingList from "components/ui/BookingList";
import BOOKING_API from "lib/api/booking";
import withAuth from "lib/hocs/withAuth";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import * as React from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Layout from "./../components/ui/Layout/Layout";

const moment = extendMoment(Moment);

// startDate: moment().add(8, "weeks").toISOString(),
// endDate: moment().add(9, "weeks").toISOString(),

const BookingsPage = ({ data }) => {
  return (
    <Layout title="Account Settings">
      <h1>My bookings</h1>
      <BookingList bookings={data} />
    </Layout>
  );
};

BookingsPage.getInitialProps = async (ctx) => {
  try {
    const resp = await BOOKING_API.getBookings();

    return {
      data: resp.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      data: [],
    };
  }
};

export default withAuth(BookingsPage);
