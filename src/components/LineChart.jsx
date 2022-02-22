import React,{useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


import { Col, Row, Typography } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Stats',
    },
  },

};

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  
  console.log(coinHistory)
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1)
  {
    const date = new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    coinTimestamp.push(date);
  }
  console.log(coinTimestamp)
  const [data, setData] = useState({
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
  })
 
  useEffect(() =>
  {
    const dataC = {
      labels: coinTimestamp,
      datasets: [
        {
          label: 'Price in USD',
          data: coinPrice,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ]
    }
    setData({ ...data, dataC })
 
  }, coinPrice)
  

  

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">{coinName} Price Chart </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Typography.Title>
          <Typography.Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Typography.Title>
        </Col>
      </Row>
      <Line options={options} data={data} />;
    </>
  );
};

export default LineChart;