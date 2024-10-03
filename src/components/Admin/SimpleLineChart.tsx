
import { ChartsLegend, ChartsTooltip, ChartsXAxis, ChartsYAxis, ResponsiveChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { BookingDetails } from '../../types';

const uData = [4000, 3000, 2000, 2780, 1890];
// const xLabels = [
//   'Page A',
//   'Page B',
//   'Page C',
//   'Page D',
//   'Page E',
//   'Page F',
//   'Page G',
// ];

export default function SimpleLineChart({ allBookings }: { allBookings: BookingDetails[] }) {
  const [xLabels, setXLabels] = useState<string[]>([])
  const [xValues, setXValues] = useState<number[]>([])
  useEffect(() => {
    const temp_count: string[] = [];
    allBookings.map(booking => {
      temp_count.push(booking.slot);
    })

    var occurrences = temp_count.reduce(function (obj: { [key: string]: number }, item) {
      obj[item] = (obj[item] || 0) + 1;
      return obj;
    }, {});

    setXLabels(Object.keys(occurrences))
    setXValues(Object.values(occurrences));

  }, [allBookings])


  return (
    <ResponsiveChartContainer
      series={[
        { type: 'line', data: xValues, label: 'Times Booked', connectNulls: true, color: '#262628' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      yAxis={[{ min: 0 },]}
    >
      <LinePlot />
      <MarkPlot />

      <ChartsXAxis />
      <ChartsYAxis />
      <ChartsTooltip />
      <ChartsLegend slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'top', horizontal: 'right' },
          padding: 0,
        },
      }} />

    </ResponsiveChartContainer>
  );
}
