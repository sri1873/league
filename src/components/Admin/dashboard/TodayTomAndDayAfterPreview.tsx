import { ColGrid, Col } from "@tremor/react";
import { Card } from "antd";
import React,{ useEffect, useState } from "react";
import DashBoardTable from "./DashBoardTable";
import { BookingByUser } from "../../../types";

const TodayTomAndDayAfterPreview: React.FC<{ allBookings: BookingByUser[] }> = ({allBookings}) => {
  const [data, setData] = useState<BookingByUser[][]>([[], [], []]);

  useEffect(() => {
    setData(categorizeBookingsByDate(allBookings));
  }, [allBookings]);

  function categorizeBookingsByDate(bookings: BookingByUser[]): BookingByUser[][] {
    const today: Date = new Date();
    const tomorrow: Date = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow: Date = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const todayBookings: BookingByUser[] = bookings.filter((booking) => {
      const bookingDate :Date= new Date(booking.bookingDate);
      return bookingDate.toDateString() === today.toDateString();
    });

    const tomorrowBookings: BookingByUser[] = bookings.filter((booking) => {
      const bookingDate:Date = new Date(booking.bookingDate);
      return bookingDate.toDateString() === tomorrow.toDateString();
    });

    const dayAfterTomorrowBookings: BookingByUser[] = bookings.filter((booking) => {
      const bookingDate :Date= new Date(booking.bookingDate);
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
