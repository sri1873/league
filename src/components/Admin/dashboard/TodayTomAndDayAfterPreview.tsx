import { ColGrid, Col } from "@tremor/react";
import { Card } from "antd";
import { useEffect, useState } from "react";
import DashBoardTable from "./DashBoardTable";

const TodayTomAndDayAfterPreview: React.FC = (props) => {
  const [data, setData] = useState([[], [], []]);

  useEffect(() => {
    setData(categorizeBookingsByDate(props.data));
  }, [props.data]);

  function categorizeBookingsByDate(bookings) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const todayBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      return bookingDate.toDateString() === today.toDateString();
    });

    const tomorrowBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      return bookingDate.toDateString() === tomorrow.toDateString();
    });

    const dayAfterTomorrowBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      return bookingDate.toDateString() === dayAfterTomorrow.toDateString();
    });

    return [todayBookings, tomorrowBookings, dayAfterTomorrowBookings];
  }

  return (
    <Card
      bodyStyle={{
        border: "1px solid black",
        marginBottom: "30px",
        backgroundColor: "var(--primary-bg)",
      }}
    >
      <ColGrid numCols={3} gapX="gap-x-10">
        <Col>
          <DashBoardTable data={data[0]} title="Today's Bookings" />
        </Col>
        <Col>
          <DashBoardTable data={data[1]} title="Tomorrow's Bookings" />
        </Col>
        <Col>
          <DashBoardTable
            data={data[2]}
            title="Day After Tomorrow's Bookings"
          />
        </Col>
        {/* <Col>
          <Title>Day After Tomorrow's Bookings</Title>
          <Divider />
          <ViewBooking size="small" data={data[2]} />
        </Col> */}
      </ColGrid>
    </Card>
  );
};

export default TodayTomAndDayAfterPreview;
