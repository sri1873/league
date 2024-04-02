import { Table } from "antd";

import { BookingDetails } from "../../types";
interface DashTableProps {
  data: BookingDetails[],
}

const BookingsToday: React.FC<DashTableProps> = ({ data }) => {
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
    <div style={{
      marginBottom: "30px",
      backgroundColor: "var(--primary-bg)",
    }}>
        <Table
          dataSource={data}
          columns={columns}
          size="middle"
          pagination={{ pageSize: 8 }}
          rowKey="id"
        />
    </div>
  );
};

export default BookingsToday;
