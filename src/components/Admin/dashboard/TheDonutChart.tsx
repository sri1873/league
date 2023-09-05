import { DonutChart } from "@tremor/react";
import { BookingByUser } from "../../../types";

const TheDonutChart: React.FC<{ allBookings: BookingByUser[] }> = ({allBookings}) => {
  const valueFormatter = (number: number) => "Count: " + number;

  function countBookingsByArena(): { arena: string, timesBooked: number }[] {
    const bookings = allBookings;
    const arenaCounts: { [key: string]: number } = {};

    bookings.forEach((booking) => {
      const arena = booking.arena;

      if (!arenaCounts[arena]) {
        arenaCounts[arena] = 0;
      }
      arenaCounts[arena]++;
    });

    const result: { arena: string, timesBooked: number }[] = Object.keys(arenaCounts).map((arena) => {
      return { arena: arena, timesBooked: arenaCounts[arena] };
    });
    return result;
  }

  return (
    <DonutChart
      data={countBookingsByArena()}
      category="timesBooked"
      dataKey="arena"
      valueFormatter={valueFormatter}
    ></DonutChart>
  );
};

export default TheDonutChart;
