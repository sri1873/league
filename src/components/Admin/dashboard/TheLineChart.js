import { LineChart } from "@tremor/react";

const TheLineChart = (props) => {
  const activeData = props.data;

  function countOccupiedHours() {
    const bookings = activeData;
    const counts = {};

    for (let booking of bookings) {
      const [startTime, endTime] = booking.timeslot.split(" - ");

      const startDate = new Date(`1970-01-01T${startTime}`);
      const endDate = new Date(`1970-01-01T${endTime}`);

      let currentHour = startDate.getHours();
      while (currentHour < endDate.getHours()) {
        const occupiedHour = `${currentHour
          .toString()
          .padStart(2, "0")}:00:00-${(currentHour + 1)
          .toString()
          .padStart(2, "0")}:00:00`;
        counts[occupiedHour] = (counts[occupiedHour] || 0) + 1;

        currentHour++;
      }
    }

    const result = Object.entries(counts).map(
      ([occupiedHour, timesOccupied]) => ({
        occupiedHour,
        "Times occupied": timesOccupied,
      })
    );
    result.sort((a, b) => {
      const aHour = parseInt(a.occupiedHour.substring(0, 2));
      const bHour = parseInt(b.occupiedHour.substring(0, 2));
      return aHour - bHour;
    });

    return result;
  }

  return (
    <LineChart
      data={countOccupiedHours()}
      dataKey="occupiedHour"
      categories={["Times occupied"]}
    ></LineChart>
  );
};

export default TheLineChart;
