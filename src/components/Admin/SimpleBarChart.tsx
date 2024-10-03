
import { ChartsLegend, ChartsTooltip, ChartsXAxis, ChartsYAxis, ResponsiveChartContainer } from '@mui/x-charts';
import { BarPlot } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { BookingDetails } from '../../types';


export default function SimpleBarChart({ allBookings }: { allBookings: BookingDetails[] }) {
    const [xLabels, setXLabels] = useState<string[]>([])
    const [xValues, setXValues] = useState<number[]>([])
    useEffect(() => {
        const temp_count: string[] = [];
        allBookings.map(booking => {
            temp_count.push(booking.arena);
        })

        var occurrences = temp_count.reduce(function (obj: { [key: string]: number }, item) {
            obj[item] = (obj[item] || 0) + 1;
            return obj;
        }, {});

        setXLabels(Object.keys(occurrences))
        setXValues(Object.values(occurrences));
        console.log(Object.keys(occurrences));

    }, [allBookings])

    return (
        <ResponsiveChartContainer
            series={[
                { type: 'bar', data: xValues, label: 'Schools', id: 'uvId', color:'#262628' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
        >
            <ChartsXAxis />
            <ChartsYAxis />
            <BarPlot />
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
