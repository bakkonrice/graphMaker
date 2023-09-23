import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useEffect, useRef, useState } from 'react';
import InputTable from './InputTable';

const drawerBleeding = 5;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: "#fff",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: grey[700],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[800],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}



export default function Table({onDownload}, props: Props) {
  const { window } = props; 
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState("NULL");

  useEffect(() => {
    if (localStorage.getItem("name") == null){
      setName(`"New Project"`)
      localStorage.setItem("name", `"New Project"`)
    } else {
      setName(localStorage.getItem("name"));
    }
}, [`"New Project"`]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const size = useWindowSize()
 
  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <Root>
      {/* <CssBaseline /> */}
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
           // height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      {/* <Box sx={{backgroundColor:"#ff8800", textAlign: 'center'}}> //debug button
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box> */}
      <SwipeableDrawer
        hideBackdrop={true}
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        variant='persistent'
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
          onBackdropClick: toggleDrawer(false),
        }}
      >
        <StyledBox
          sx={{
            //backgroundColor:"#ff8800",
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            visibility: 'visible',
            right: 0,
            left: 0,
            display:"flex",
          }}
        >
          {/* <Puller/> */}
          {/* <Typography sx={{p:2,color: '#fff' }}> </Typography> */}
            {/* <IconButton onClick={onDownload} sx={{top:5,position:"absolute", right:"120px"}}>
              <RemoveIcon sx={{color:"#fff"}}/>
            </IconButton>
            <IconButton onClick={onDownload} sx={{top:5,position:"absolute", right: "80px"}}>
              <AddIcon sx={{color:"#fff"}}/>
            </IconButton>
            <IconButton onClick={onDownload} sx={{top:5,position:"absolute", right:"0"}}>
              <DownloadIcon sx={{color:"#fff"}}/>
            </IconButton>
            <IconButton sx={{top:5,position:"absolute", right:"40px"}}>
              <DeleteIcon sx={{color:"#fff"}}/>
            </IconButton> */}
        </StyledBox>
        <StyledBox
        
          sx={{
            px: 2,
            pb: 2,
            height: size.height/3,
            overflow: 'auto',
            // paddingTop: "-5vh",
            // top: -200
          }}
        >
          {/* <Skeleton variant="rectangular" height="100%"/> */}
          <InputTable name={name.substring(1, name.length-1)}/>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}