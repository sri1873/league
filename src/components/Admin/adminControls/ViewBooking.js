/* TODO
Add more entries in columns constant depending on format of data
Write more filter/search operations if required
*/

import { Table } from "antd";
import "./adminControls.css";

const ViewBooking = (props) => {
  const data = props.data;

  function getPrintableData() {
    data.map((el) => {
      let date = new Date(el.bookingDate);
      el.printableBookingDate =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      return el;
    });
    return data;
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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Booked By",
      dataIndex: "name",
      key: "name",
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
    },
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Amount (in INR)",
      dataIndex: "amount",
      key: "id",
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
  ];

  return (
    <div>
      <Table dataSource={getPrintableData()} columns={columns} rowKey="id" />
    </div>
  );
};

export default ViewBooking;
