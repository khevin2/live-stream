import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box/Box";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MenuContext } from "../pages/PageLayout";

const Logs = () => {
  const { left } = useContext(MenuContext);
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/logs")
      .then((response) => {
        const messages = response.data.logs.map((log) => log.message);
        setLogData(messages);
        console.log(messages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const chartData = {
    labels: logData.length > 0 && [...Object.keys(logData[0])],
    datasets: [
      {
        label: "Log Messages",
        data: logData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Box
      sx={{
        left: `${left}px`,
        position: "absolute",
        top: "65px",
        bottom: "auto",
        height: `calc(100% - 65px)`,
        width: `calc(100% - ${left}px)`,
      }}
    >
      <h1>Log Chart</h1>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default Logs;
/////////////////

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import faker from "faker";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Line Chart",
//     },
//   },
// };

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

//   return <Line options={options} data={data} />;
