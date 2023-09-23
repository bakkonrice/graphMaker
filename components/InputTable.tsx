import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp, useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import {
  randomInt,
} from '@mui/x-data-grid-generator';
import * as defaultData from "./defaultData.json"
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SquareIcon from '@mui/icons-material/Square';
import ColorPicker from './colorPicker';
import Modal from '@mui/material/Modal';
import styles from '../styles/Home.module.scss'

const newRow = () => {
  return { id: Math.floor(Math.random() * 10000000000), name: "new", value: randomInt(10, 20) };
};




export default function InputTable({name, onDownload}) {
  const [size, setSize] = React.useState(100);
  const [chartData, setChartData] = React.useState("")
  const [showResults, setShowResults] = React.useState(false)
  const [chartColor, setChartColor] = React.useState("#ff7700")
  const ref = React.useRef(null)

  //test
  const handleUpdateColor = () => {
    if (chartData){
      let newData = JSON.parse(chartData)
      if (newData["type"] == "area"){
        newData["datasets"]["0"]["backgroundColor"] = `${chartColor}aa`
        newData["datasets"]["0"]["borderColor"] = chartColor
      } else {
        newData["datasets"]["0"]["backgroundColor"] = `${chartColor}`
      }
      setChartData(JSON.stringify(newData))
    }
  }


  React.useEffect(() => {
    setSize(window.screen.width)
    if (chartData != ""){
      localStorage.setItem("chartData", chartData)
    }
    if (localStorage.getItem("color") == null){
      localStorage.setItem("color", "#ff7700")
    }
    setChartColor(localStorage.getItem("color"))
    setChartData(localStorage.getItem("chartData"))

    handleUpdateColor()
  })

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: size/2.5, editable: true},
    {
      field: 'value',
      headerName: 'Value',
      type: 'number',
      width: size-(size/2.5)-35,
      editable: true,
    },
  ];

  const [rows, setRows] = React.useState(() => [
    {
      id: 1,
      name: "Apples",
      value: 7,
    },
    {
      id: 2,
      name: "Oranges",
      value: 12,
    },
    {
      id: 3,
      name: "Bananas",
      value: 5,
    }
  ]);


  const apiRef = useGridApiRef();

  const test = (err) => {
    console.log(err)
  }

  

  const handleUpdateRow = (newValue, oldValue) => {
    // setRows((prevRows) => {
    //   const rowToUpdateIndex = randomInt(0, rows.length - 1);

    //   return prevRows.map((row, index) =>
    //     index === rowToUpdateIndex ? { ...row, username: randomUserName() } : row,
    //   );
    // });

    let newRows = []
    let newData = JSON.parse(chartData)
    for (let i = 0; i<newData["datasets"]["0"]["data"].length; i++){
      if (newData["ids"][i] == newValue["id"]){
        newRows[i] = newValue
      } else {
        newRows[i] = {
          id: (newData["ids"][i] == null || newData["ids"][i] == undefined) ?  Math.floor(Math.random() * 10000000000) : newData["ids"][i],
          value: newData["datasets"]["0"]["data"][i],
          name: newData["labels"][i]
        }
      }
    }

    setRows(() => [...newRows]); 
    newData["ids"] = newRows.map((row) => row["id"])
    newData["datasets"]["0"]["data"] = [...newRows].map((row) => row["value"])
    // newData["datasets"]["0"]["backgroundColor"] = chartColor
    newData["labels"] = newRows.map((row) => row["name"])

    setChartData(JSON.stringify(newData))

    return newValue
  };

  const handleDeleteRow = () => {
    let newData = JSON.parse(chartData)
    let newRows = []

    // for (let i = 0; i<newData["datasets"]["0"]["data"].length; i++){
    //   newRows[i] = {
    //     id: (newData["ids"][i] == null || newData["ids"][i] == undefined) ?  Math.floor(Math.random() * 10000000000) : newData["ids"][i],
    //     value: newData["datasets"]["0"]["data"][i],
    //     name: newData["labels"][i]
    //   }
    // }

    // console.log([...newRows, nuevo])
    // setRows((prevRows) => [...newRows, nuevo]); 
    // console.log(rows)
    // newData["ids"] = newRows.map((row) => row["id"])
    // newData["datasets"]["0"]["data"] = [...newRows, nuevo].map((row) => row["value"])
    // newData["labels"] = [...newData["labels"], "test"]

    // setChartData(JSON.stringify(newData))

    if (rows.length > 0){

      for (let i = 0; i<newData["datasets"]["0"]["data"].length; i++){
        newRows[i] = {
          id: (newData["ids"][i] == null || newData["ids"][i] == undefined) ?  Math.floor(Math.random() * 10000000000) : newData["ids"][i],
          value: newData["datasets"]["0"]["data"][i],
          name: newData["labels"][i]
        }
      }

      setRows(() => [...newRows.slice(0, newRows.length-1)]); 
      newData["ids"] = newRows.map((row) => row["id"])
      newData["datasets"]["0"]["data"] = [...newRows.slice(0, newRows.length-1)].map((row) => row["value"])
      // newData["datasets"]["0"]["backgroundColor"] = chartColor
      newData["labels"] = (newRows.slice(0, newRows.length-1)).map((row) => row["name"])
      setChartData(JSON.stringify(newData))

      // setRows((prevRows) => {
      //   const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
      //   return [
      //     ...rows.slice(0, rowToDeleteIndex),
      //     ...rows.slice(rowToDeleteIndex + 1),
      //   ];
      // });
    }
  };

  const handleAddRow = () => {
    const nuevo = newRow()
    // setRows((prevRows) => [...prevRows, nuevo]); 

    let newData = JSON.parse(chartData)

    let newRows = [
    ]
    // console.log(JSON.parse(chartData)["datasets"]["0"]["data"])
    if (newData["ids"] == undefined){
      newData["ids"] = []
    }

    for (let i = 0; i<newData["datasets"]["0"]["data"].length; i++){
      newRows[i] = {
        id: (newData["ids"][i] == null || newData["ids"][i] == undefined) ?  Math.floor(Math.random() * 10000000000) : newData["ids"][i],
        value: newData["datasets"]["0"]["data"][i],
        name: newData["labels"][i]
      }
    }

    setRows(() => [...newRows, nuevo]); 
    newData["ids"] = newRows.map((row) => row["id"])
    newData["datasets"]["0"]["data"] = [...newRows, nuevo].map((row) => row["value"])
    newData["labels"] = [...newData["labels"], "new"]

    setChartData(JSON.stringify(newData))
  };
  
  const handleColorOpen = () => setShowResults(true)
  const handleColorClose = () => setShowResults(false)

  const download = () => {

  }

  return (
    <>
    {/* zIndex:100, position:"absolute", width:"10vw", bottom:"100px", left:"50vw",   backgroundColor:"#ff77ff" */}
      <Modal
      open={showResults}
      onClose={handleColorClose}
      >
        <div className={styles.color}>
          {showResults ? <ColorPicker/> : null}
        </div>
      </Modal>
      <div style={{ height: 250, width: '100%', paddingTop: "20px" }}>
        <Box sx={{ width: '100%' }}>
          {/* <Typography>{name}</Typography> */}
          <IconButton onClick={handleDeleteRow} sx={{zIndex:10, top:5,position:"absolute", right:"120px"}}>
              <RemoveIcon sx={{color:"#fff"}}/>
          </IconButton>
          <IconButton onClick={handleAddRow} sx={{zIndex:10,top:5,position:"absolute", right: "80px"}}>
              <AddIcon sx={{color:"#fff"}}/>
          </IconButton>
          <IconButton onClick={onDownload} sx={{zIndex:10, top:5,position:"absolute", right:"40px"}}>
              <DownloadIcon sx={{color:"#fff"}}/>
          </IconButton>
          <IconButton onClick={() => {
            setShowResults(!showResults)
          }} sx={{zIndex:10, top:5,position:"absolute", right:"0"}}>
              <SquareIcon  sx={{color:chartColor}}/>
          </IconButton>
          {/* <IconButton sx={{zIndex:10, top:5,position:"absolute", right:"40px"}}>
              <DeleteIcon sx={{color:"#fff"}}/>
          </IconButton> */}
          {/* <button style={{zIndex: 10, top: 10, padding:"5", position: "absolute", right:"0", minWidth:"20px", minHeight:"20px"}}></button> */}
        <Stack direction="row" spacing={1}>
          {/* <Button size="small" onClick={handleUpdateRow}>
            Update a row
          </Button> */}
          {/* <Button size="small" onClick={handleDeleteRow}>
            Delete a row
          </Button>
          <Button size="small" onClick={handleAddRow} sx={{alignItems:"right"}}>
            Add a row
          </Button> */}
        </Stack>
        <Box sx={{ height: 400, mt: 1 }}>
          <DataGrid initialState={{
      pagination: { paginationModel: { pageSize: 10 } },
    }} apiRef={apiRef} rows={rows} columns={columns} 
    processRowUpdate={handleUpdateRow}
    onProcessRowUpdateError={test}
    
    />
    
    
        </Box>
      </Box>
      </div>
    </>
  );
}


