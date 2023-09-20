import { PaletteColorOptions, ThemeProvider, createTheme } from '@mui/material';
import '../styles/globals.scss'
import { orange, gray } from '../components/config';
import React from "react";
import AppBar2 from '../components/AppBar2';
import Create from './create';
import { Provider, useSelector } from 'react-redux';
import {RootState, store} from '../components/store';

import CssBaseline from '@mui/material/CssBaseline';

declare module '@mui/material/styles' {
  interface CustomPalette {
    secondary: PaletteColorOptions;
    primary: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    secondary: true,
  }
}

declare module '@mui/material/AppBar' {
  interface ButtonPropsColorOverrides {
    secondary: true,
  }
}

declare module '@mui/icons-material/Menu' {
  interface ButtonPropsColorOverrides {
    primary: true,
  }
}

declare module '@mui/material/TextField' {
  interface ButtonPropsColorOverrides {
    secondary: true,
  }
}

declare module '@mui/material/ListItemButton' {
  interface ButtonPropsColorOverrides {
    secondary: true,
  }
}





const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor('#FFFFFF'),
    secondary: createColor(orange),
    mode:"dark"
  },
});
function MyApp({ Component, pageProps }) {
  
  return (
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div style={{backgroundColor:gray, color:"#ffffff", width:"100vw", "height":"100vh"}}>
          <AppBar2/>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    {/* </Provider> */}
  </React.StrictMode>)
}

export default MyApp
