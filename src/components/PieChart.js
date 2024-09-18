import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item['Location']),
        datasets: [
            {
                data: data.map(item => item['Magnitude']),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#E8C3B9',
                    '#C9CBCF',
                ],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;
