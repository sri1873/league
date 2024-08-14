import { Table } from "antd";

import { useEffect, useState } from "react";
import base from "../../apis/base";
import { Arena, BookingDetails } from "../../types";
import SimpleBarChart from "./SimpleBarChart";
import TheLineChart from "./SimpleLineChart";
import './bookingstoday.css';
interface DashTableProps {
  data: BookingDetails[],
}

const BookingsToday: React.FC<DashTableProps> = ({ data }) => {
  const [allBookings, setAllBookings] = useState<BookingDetails[]>([
    // {
    //   "school": "BBA",
    //   "bookingId": "WOUBK0002120",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 6",
    //   "slot": "7PM - 8PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // },
    // {
    //   "school": "BTech",
    //   "bookingId": "WOUBK0002121",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 5",
    //   "slot": "7PM - 8PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // },
    // {
    //   "school": "BTech",
    //   "bookingId": "WOUBK0002122",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 6",
    //   "slot": "9PM - 10PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // },
    // {
    //   "school": "MBA",
    //   "bookingId": "WOUBK0002123",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 2",
    //   "slot": "9PM - 10PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // },
    // {
    //   "school": "Design",
    //   "bookingId": "WOUBK0002124",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 4",
    //   "slot": "7PM - 8PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // },
    // {
    //   "school": "Design",
    //   "bookingId": "WOUBK0002125",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 4",
    //   "slot": "6PM - 7PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // },
    // {
    //   "school": "Btech",
    //   "bookingId": "WOUBK0002126",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 4",
    //   "slot": "6PM - 7PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // },
    // {
    //   "school": "BTech",
    //   "bookingId": "WOUBK0002127",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 2",
    //   "slot": "10PM - 11PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // },
    // {
    //   "school": "BCom",
    //   "bookingId": "WOUBK0002128",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 5",
    //   "slot": "8PM - 9PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // },
    // {
    //   "school": "BCom",
    //   "bookingId": "WOUBK0002129",
    //   "bookingDate": "2023-10-06",
    //   "arena": "Badminton court 5",
    //   "slot": "9PM - 10PM",
    //   "paymentStatus": null,
    //   "extended": null,
    //   "extendable": false
    // }
  ]);
  const [arenaDropdown, setArenaDropDown] = useState<Arena[]>();
  const [dateFilter, setDateFilter] = useState<string>(new Date().toISOString().split('T')[0]);
  const [arenaId, setArenaId] = useState<string>();



  useEffect(() => {
    base.get("api/v1/arenas").then(res => { setArenaDropDown(res.data.data); setArenaId(res.data.data[0].id) })
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    base.get(`api/v1/booking/arenas/${arenaId}/getBookingsByDate?date=${dateFilter}`).then(res => setAllBookings(res.data.data))
  }
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
      title: "User Phone No.",
      dataIndex: "userPhone",
      key: "userPhone",
    },
  ];


  return (
    <div className="dashboard-container">
      <form className="search-form" onSubmit={e => handleSearch(e)}>
        <div className="arena-dropdown col-md-4 ">
          <label style={{ alignContent: 'center' }}>Arena</label>
          <select value={arenaId} className="form-select col-md-4" onChange={e => setArenaId(e.target.value)} >
            {arenaDropdown?.map((arena) => {
              return <option key={arena.id} value={arena.id}>{arena.name}</option>
            })}
          </select>
        </div>
        <div className="arena-dropdown col-md-4 ">
          <label style={{ alignContent: 'center' }}>Date</label>
          <input className="form-control" type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      <div className="booking-today-bar">
        <p className="chart-title">Booking Frequency by Student Course</p>
        <SimpleBarChart allBookings={allBookings} />
      </div>
      <Table
        dataSource={allBookings}
        columns={columns}
        size="small"
        pagination={{ pageSize: 8 }}
        rowKey="id"
        className="bookings-today-table"
      />
      <div className="bookings-today-line">
        <p className="chart-title">Usage by Hour</p>
        <TheLineChart allBookings={allBookings} />
      </div>
    </div>
  );
};

export default BookingsToday;
