/* TODO
Add more entries in columns constant depending on format of bookings
Write more filter/search operations if required
*/

import { Table } from "antd";
import "./adminControls.css";
import React from "react";
import { BookingByUser } from "../../../types";

const ViewBooking: React.FC<{ bookings: BookingByUser[] }> = ({ bookings }) => {

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },

    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate"
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
        dataSource={bookings}
        columns={columns}
        size="middle"
        scroll={{
          x: "calc(700px+50%)",
        }}
        rowKey="id"
      />
    </div>
  );
};

export default ViewBooking;
