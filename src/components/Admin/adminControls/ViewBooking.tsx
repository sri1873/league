/* TODO
Add more entries in columns constant depending on format of bookings
Write more filter/search operations if required
*/

import { Table } from "antd";
import "./adminControls.css";
import React from "react";
import { BookingByUser } from "../../../types";

const ViewBooking: React.FC<{bookings:BookingByUser[]}>= ({bookings}) => {

  function getPrintableData() {
    bookings.map((booking) => {
      let date = new Date(booking.bookingDate);
      booking.printableBookingDate =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      if (booking.paymentStatus == null) booking.paymentStatus = "NA";
      return booking;
    });
    return bookings;
  }

  function compareDates(obj1, obj2) {
    // Convert the date strings to Date objects
    const date1 = new Date(
      obj1.printableBookingDate.split("/").reverse().join("-")
    );
    const date2 = new Date(
      obj2.printableBookingDate.split("/").reverse().join("-")
    );

    // Compare the dates and return an integer
    if (date1 > date2) {
      return 1;
    } else if (date1 < date2) {
      return -1;
    } else {
      return 0;
    }
  }

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },

    {
      title: "Booking Date",
      dataIndex: "printableBookingDate",
      key: "printableBookingDate",
      sorter: (a, b) => compareDates(a, b),
    },
    {
      title: "Arena",
      dataIndex: "arena",
      key: "arena",
    },
    {
      title: "Timeslot",
      dataIndex: "timeslot",
      key: "timeslot",
    },
    {
      title: "User Phone No.",
      dataIndex: "userPhone",
      key: "userPhone",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
  ];

  return (
    <div>
      <Table
        dataSource={getPrintableData()}
        columns={columns}
        size={props.size ?? "large"}
        scroll={{
          x: "calc(700px+50%)",
        }}
        rowKey="id"
      />
    </div>
  );
};

export default ViewBooking;
