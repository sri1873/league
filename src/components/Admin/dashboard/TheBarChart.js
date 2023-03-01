import { BarChart } from "@tremor/react";

const TheBarChart = (props) => {
  const activeData = props.data;

  function getRevenuePerGround() {
    const bookings = activeData;
    const arenaTotals = {};

    bookings.forEach((booking) => {
      const arena = booking.arena;
      const amount = booking.amount;

      if (!arenaTotals[arena]) {
        arenaTotals[arena] = 0;
      }

      arenaTotals[arena] += amount;
    });

    const result = Object.keys(arenaTotals).map((arena) => {
      return { arena: arena, "Amount Generated": arenaTotals[arena] };
    });

    return result;
  }

  return (
    <BarChart
      data={getRevenuePerGround()}
      dataKey="arena"
      categories={["Amount Generated"]}
      marginTop="mt-6"
      yAxisWidth="w-12"
    ></BarChart>
  );
};

export default TheBarChart;
