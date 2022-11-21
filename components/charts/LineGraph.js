import React from 'react'
import { Line } from 'react-chartjs-2'

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const  LineChart = (data) => {
    const chartData = {
        labels: data.data.labels,
        datasets: [
            {
                label: '# of Sell',
                data: data.data.dataSize,
                fill: false,
                backgroundColor: data.data.backgroundColor,
                borderColor:data.data.borderColor,
            },
        ],
    };
    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    )
};

export default  LineChart;
