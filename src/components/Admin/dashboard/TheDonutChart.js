import { DonutChart } from "@tremor/react";

const TheDonutChart = (props) => {
  const activeData = props.data;

  function countBookingsByArena() {
    const bookings = activeData;
    const arenaCounts = {};

    bookings.forEach((booking) => {
      const arena = booking.arena;

      if (!arenaCounts[arena]) {
        arenaCounts[arena] = 0;
      }
      arenaCounts[arena]++;
    });

    const result = Object.keys(arenaCounts).map((arena) => {
      return { arena: arena, timesBooked: arenaCounts[arena] };
    });
    return result;
  }

  return (
    <DonutChart
      data={countBookingsByArena()}
      category="timesBooked"
      dataKey="arena"
    ></DonutChart>
  );
};

export default TheDonutChart;
