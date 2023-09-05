import { LineChart } from "@tremor/react";
import { BookingByUser } from "../../../types";

const TheLineChart: React.FC<{ allBookings: BookingByUser[] }> = ({allBookings}) => {

  function countOccupiedHours(): { occupiedHour: string, "Times occupied": number }[] {
    const counts: { [key: string]: number } = {};

    for (let booking of allBookings) {
      const [startTime, endTime]: string[] = booking.slot.split(" - ");

      const startDate: Date = new Date(`1970-01-01T${startTime}`);
      const endDate: Date = new Date(`1970-01-01T${endTime}`);

      let currentHour: number = startDate.getHours();
      while (currentHour < endDate.getHours()) {
        const occupiedHour: string = `${currentHour
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
    result.sort((a, b): number => {
      const aHour: number = parseInt(a.occupiedHour.substring(0, 2));
      const bHour: number = parseInt(b.occupiedHour.substring(0, 2));
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
