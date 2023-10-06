import { LineChart } from "@tremor/react";
import { BookingByUser, BookingDetails } from "../../../types";

const TheLineChart: React.FC<{ allBookings: BookingDetails[] }> = ({ allBookings }) => {

  function parseTimeToDatetime(timeStr: string): string {
    const [hours, ampm] = timeStr.split(/(\d+)([APM]+)$/).filter(Boolean);
    let hoursParsed = parseInt(hours);
    if (ampm === "PM" && hoursParsed !== 12) {
      hoursParsed += 12;
    } else if (ampm === "AM" && hoursParsed === 12) {
      hoursParsed = 0;
    }
    return hoursParsed.toString() + ":00";
  }

  function countOccupiedHours(): { occupiedHour: string, "Times occupied": number }[] {
    const counts: { [key: string]: number } = {};

    for (let booking of allBookings) {
      const [startTime, endTime]: string[] = booking.slot.split(" - ");
      const occupiedHour: string = `${parseTimeToDatetime(startTime)}-${(parseTimeToDatetime(endTime))}`;
      counts[occupiedHour] = (counts[occupiedHour] || 0) + 1;
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
