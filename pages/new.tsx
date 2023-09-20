import * as React from 'react'
import styles from '../styles/Home.module.scss'
import TextField from '@mui/material/TextField'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, Icon, ListItemButton, SvgIcon, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/router';
import * as defaultData from "../components/defaultData.json"
import {exporting} from "../components/config";
import Image from 'next/image';

const defaultDataList = [defaultData.bar, defaultData.pie, defaultData.line, defaultData.area]

let ending: string = ""
if (exporting){
  ending = ".html"
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
    palette: {
      mode: "dark",
      primary: createColor("#D35400"),
    },
  });

let chartTypes: string[] = ["Bar Chart", "Pie Chart", "Line Chart", "Area Chart"]
let chartIcons = [
  <svg key={0} version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256"><title>Bar Chart</title><style>{`.s0 { fill: #2b2b2b }`} {`.s1 { fill: #d35400 }`} </style><path id="Forma 2" className="s0" d="m0 128c0-70.7 57.3-128 128-128 70.7 0 128 57.3 128 128 0 70.7-57.3 128-128 128-70.7 0-128-57.3-128-128z"/><path id="Forma 1" className="s1" d="m39.2 56.8c0-5.6 4.5-10 10-10h7.6c5.5 0 10 4.4 10 10v142.4c0 5.6-4.5 10-10 10h-7.6c-5.5 0-10-4.4-10-10zm29.8 45.5c0-5.5 4.5-10 10-10h7.6c5.5 0 10 4.5 10 10v97c0 5.6-4.5 10-10 10h-7.6c-5.5 0-10-4.4-10-10zm29.8 76.1c0-5.6 4.5-10 10-10h7.6c5.5 0 10 4.4 10 10v21c0 5.5-4.5 10-10 10h-7.6c-5.5 0-10-4.5-10-10zm29.8-104.4c0-5.5 4.5-10 10-10h7.6c5.5 0 10 4.5 10 10v125.3c0 5.6-4.5 10-10 10h-7.6c-5.5 0-10-4.4-10-10zm29.8-5.2c0-5.5 4.5-10 10-10h7.6c5.5 0 10 4.5 10 10v130.6c0 5.5-4.5 10-10 10h-7.6c-5.5 0-10-4.5-10-10zm29.8 58.1c0-5.5 4.5-10 10-10h7.6c5.5 0 10 4.5 10 10v72.5c0 5.5-4.5 10-10 10h-7.6c-5.5 0-10-4.5-10-10z"/></svg>,
  <svg key={1} version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256"><title>Pie Chart</title><defs><clipPath clipPathUnits="userSpaceOnUse" id="cp1"><path d="m17 128.33c0-61.48 49.85-111.33 111.33-111.33 61.49 0 111.34 49.85 111.34 111.33 0 61.49-49.85 111.34-111.34 111.34-61.48 0-111.33-49.85-111.33-111.34z"/></clipPath></defs><style>{`.s0 { fill: #2b2b2b }`}{`.s1 { fill: #d35400 }`} {`.s2 { fill: #e57300 }`} </style><path id="Forma 2" className="s0" d="m0 128c0-70.7 57.3-128 128-128 70.7 0 128 57.3 128 128 0 70.7-57.3 128-128 128-70.7 0-128-57.3-128-128z"/><g clip-path="url(#cp1)"><path id="Forma 3" className="s1" d="m17 128.3c0-61.5 49.8-111.3 111.3-111.3 61.5 0 111.4 49.8 111.4 111.3 0 61.5-49.9 111.4-111.4 111.4-61.5 0-111.3-49.9-111.3-111.4z"/><path id="Capa 1" className="s2" d="m13 133h120l-48-119-48 21-30 89"/></g></svg>,
  <svg key={2} version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">	<title>Line Chart</title>	<style>		{`.s0 { fill: #2b2b2b }`} 		{`.s1 { fill: #d35400 }`} 	</style>	<g id="Carpeta 2">		<path id="Forma 2" className="s0" d="m0 128c0-70.7 57.3-128 128-128 70.7 0 128 57.3 128 128 0 70.7-57.3 128-128 128-70.7 0-128-57.3-128-128z"/>	</g>	<path id="Capa 2" className="s1" d="m58.6 134.1l3.8 11.5-88.5 29-3.8-11.5z"/>	<path id="Capa 2 copy" className="s1" d="m149.2 149.6l-2 11.9-91.9-15.1 2-11.9z"/>	<path id="Capa 2 copy 2" className="s1" d="m197.1 82.9l9.2 7.9-60.6 70.7-9.2-7.9z"/>	<path id="Capa 2 copy 3" className="s1" d="m285.9 114l-4.2 11.4-87.5-31.9 4.2-11.4z"/></svg>,
  <svg key={3} version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">	<title>Proyecto nuevo</title>	<style>		{`.s0 { fill: #2b2b2b }`} 		{`.s1 { fill: #e57300 }`} 		{`.s2 { fill: #d35400 }`} 	</style>	<g id="Carpeta 2">		<path id="Forma 2" className="s0" d="m0 128c0-70.7 57.3-128 128-128 70.7 0 128 57.3 128 128 0 70.7-57.3 128-128 128-70.7 0-128-57.3-128-128z"/>	</g>	<path id="Capa 3" className="s1" d="m266 119l-64-28-60 64-84-13-55 21 32 83 84 16 73 4 74-66"/>	<path id="Capa 2" className="s2" d="m58.6 134.1l3.8 11.5-88.5 29-3.8-11.5z"/>	<path id="Capa 2 copy" className="s2" d="m149.2 149.6l-2 11.9-91.9-15.1 2-11.9z"/>	<path id="Capa 2 copy 2" className="s2" d="m197.1 82.9l9.2 7.9-60.6 70.7-9.2-7.9z"/>	<path id="Capa 2 copy 3" className="s2" d="m285.9 114l-4.2 11.4-87.5-31.9 4.2-11.4z"/></svg>,
]

let premiumChartTypes: string[] = ["Pie Chart 3D"]
let premiumChartIcons: string[] = [
  "https://media.discordapp.net/attachments/949102944907829331/1153033484454084698/pieChart3d.png?width=320&height=320"
]

const New = () => {
  const [view, setView] = React.useState('list');
  const [name, setName] = React.useState('');
  const router = useRouter()

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const handleClick = () => {
    if (typeof(view) == typeof(1)){
      if (name == ""){
        setName("New Project")
      }
      router.push("/create" + ending)
      localStorage.setItem("chartType", JSON.stringify(view));
      localStorage.setItem("chartData", JSON.stringify(defaultDataList[view]))
      localStorage.setItem("name", JSON.stringify(name));
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <div className={styles.mainUpper}>
        <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
    >
            <Typography>Basic Charts</Typography>
            {chartTypes.map((text, index) => (
                <ToggleButton key={index} value={index} aria-label="list" sx={{display: "flex", justifyContent: "left", alignItems:"center", textAlign:"center"}}>
                  <Avatar>
                    {chartIcons[index]}
                  </Avatar>
                  <div style={{width:"20px"}} />
                  {text}
                </ToggleButton>
                // <ListItemButton key={index}>
                //   <ListItemAvatar>
                //     <Avatar>
                //       {chartIcons[index]}
                //     </Avatar>
                //   </ListItemAvatar>
                //   <ListItemText
                //     primary={text}
                //   />
                // </ListItemButton>
            ))}
            <br/>
            <Typography>Premium Charts</Typography>
            {premiumChartTypes.map((text, index) => (
                <ToggleButton key={index+100} value={index+100} aria-label="list" sx={{display: "flex", justifyContent: "left", alignItems:"center", textAlign:"center"}}>
                  <Avatar>
                    <img style={{width:"40px", height:"40px"}} src={premiumChartIcons[index]} alt="Image"/>
                  </Avatar>
                  <div style={{width:"20px"}} />
                  {text}
                  <Icon style={{position:"absolute", right:0}}>
                    <LockIcon/>
                  </Icon>
                </ToggleButton>
                // <ListItemButton key={index}>
                //   <ListItemAvatar>
                //     <Avatar>
                //       {chartIcons[index]}
                //     </Avatar>
                //   </ListItemAvatar>
                //   <ListItemText
                //     primary={text}
                //   />
                // </ListItemButton>
            ))}
        </ToggleButtonGroup>
        <br/>
        <TextField 
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
        sx={{width: "70vw"}} id="standard-basic" label="Project Name" variant="standard" color='primary'/>
        <br/>
        <Button onClick={handleClick} variant='contained' color='primary'>Create!</Button>
    </div>
    </ThemeProvider>
  )
}

export default New