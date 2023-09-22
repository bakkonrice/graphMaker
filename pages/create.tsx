import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import Table from '../components/Table'
import Chart from 'chart.js/auto';
import { orange, gray } from '../components/config';
import * as defaultData from "../components/defaultData.json"

const defaultDataList = [defaultData.bar, defaultData.pie, defaultData.line, defaultData.area]

const Create = () => {
  // const [userData, setUserData] = useState()

  
  const [chartType, setChartType] = useState("0")
  const [chartData, setChartData] = useState(JSON.stringify(defaultData.bar))
  const [chartName, setchartName] = useState('"New Project"')
  const [counter, setCounter] = useState(0)
  let index = 0;
  
  
  const download = () => {
    
  }


  useEffect(() => {
    setChartType(localStorage.getItem("chartType"));
    console.log(localStorage.getItem("name"))
    setchartName(localStorage.getItem("name"))
    if (localStorage.getItem("chartData") == undefined || localStorage.getItem("chartData") == "null"){
      localStorage.setItem("chartData", JSON.stringify(defaultDataList[Number(localStorage.getItem("chartType"))]))
    }
    
    setChartData(localStorage.getItem("chartData"))


    const interval = setInterval(() => {
      index += 5
      setChartData(localStorage.getItem("chartData"))
      setCounter(index)
    }, 500);
  
    return () => clearInterval(interval);
}, [chartData]);

  // console.log(JSON.stringify(defaultData.bar))
  // console.log(chartData)
  // data = JSON.parse(chartData)
  return (
    <>
      <div style={{display:"flex",justifyContent:'center',alignItems:"center"}}>
      <Typography sx={{p:"100px"}}>{chartName.substring(1, chartName.length-1)}</Typography>
          <div className={styles.chart}>
          {/* <LineChart chartData={defaultData.line}/> */}
            {chartType == "0" && <BarGraph chartData={JSON.parse(chartData)}/>}
            {chartType == "1" && <PieChart chartData={JSON.parse(chartData)}/>}
            {chartType == "2" && <LineChart chartData={JSON.parse(chartData)}/>}
            {chartType == "3" && <LineChart chartData={JSON.parse(chartData)}/>}
          </div>
          <br/>
          <div>
            <Table onDownload={download}/>  
          </div>
          
      </div>
    </>
  )
}

import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Colors, PointElement, LineElement, Filler, ArcElement } from 'chart.js';
import { Typography } from '@mui/material';

ChartJS.register(
  LinearScale, CategoryScale, Colors, BarElement, PointElement,
  LineElement, Filler, BarElement, ArcElement);

const baseConfig = {
  scales: {
    x: {
      grid: {
        color: "#4b4b4b"
      },
      ticks: {
        color: "#ffffff"
      }
    },
    y: {
      grid: {
        color: "#4b4b4b"
      },
      ticks: {
        color: "#ffffff"
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
}

const BarGraph = ({chartData}) => {
  return <Bar redraw={false}  data={chartData} options={baseConfig}/>
}

const LineChart = ({chartData}) => {
  return <Line data={chartData} options={baseConfig}/>
}

const PieChart = ({chartData}) => {
  return <Pie  data={chartData}/>
}

export {BarGraph, LineChart, PieChart}

export default Create