import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const generateColor = () => "#" + Math.random().toString(16).substr(-6)

export default function BarChart({ title, labels, dataArray }) {

    const options = {
        type: 'bar',
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            scaleOverride: true,
            xAxis: {
                min: 0,
                max: title == "Academic Details" ? 10 : 20,
            },
            // y: [
            //     {
            //         type: "number",
            //         ticks: {
            //             min: 0,
            //             max: title == "Academic Details" ? 10 : 20,
            //             stepSize: title == "Academic Details" ? 2 : 5,
            //         },
            //         barThickness: 1,  // number (pixels) or 'flex'
            //         maxBarThickness: 3 // number (pixels)
            //     },
            // ],

        },
        plugins: {
            title: {
                display: true,
                text: title,
            },
        },
    };
    const barChartLegend = true;

    const data = {
        labels,
        datasets: [{
            axis: 'y',
            label: '',
            data: dataArray,

            fill: false,
            backgroundColor: labels.map(i => generateColor()),
            borderWidth: 0,
            barThickness: 20,
            barChartLegend: false,
        }]
    };
    return <Bar options={options} data={data} />;
}
