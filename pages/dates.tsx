import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { Component } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const moment = extendMoment(Moment);

class DateRangeInput extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    bookings: [
      { startDate: moment(), endDate: moment().add(5, "weeks") },
      {
        startDate: moment().add(8, "weeks"),
        endDate: moment().add(9, "weeks"),
      },
    ],
    disbaledDates: {},
  };

  isBlocked = (date) => {
    let bookedRanges = [];
    let blocked;
    this.state.bookings.map((booking) => {
      bookedRanges = [
        ...bookedRanges,
        moment().range(booking.startDate, booking.endDate),
      ];
    });

    blocked = bookedRanges.find((range) => range.contains(date));
    return blocked;
  };

  render() {
    return (
      <DateRangePicker
        transitionDuration={0}
        isDayBlocked={this.isBlocked}
        startDateId="startDate"
        endDateId="endDate"
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onDatesChange={({ startDate, endDate }) => {
          this.setState({ startDate, endDate });
        }}
        focusedInput={this.state.focusedInput}
        onFocusChange={(focusedInput) => {
          this.setState({ focusedInput });
        }}
      />
    );
  }
}

export default DateRangeInput;
