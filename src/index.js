import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  // myStyles : {  ...themeHandler() },
  // myStyles: { ...themeHandler('dd') },
  button: {
    textTransform: 'none',
    outline: 0,
    border: 'none'
  },
  palette: {
    tonalOffset: 0.2,
    background: { paper: '#fff', default: '#fafafa' },
    contrastThreshold: 3,
    grey: {
      '50': '#fafafa',
      '100': '#f5f5f5',
      '200': '#eeeeee',
      '300': '#e0e0e0',
      '400': '#bdbdbd',
      '500': '#9e9e9e',
      '600': '#757575',
      '700': '#616161',
      '800': '#424242',
      '900': '#212121',
      A700: '#616161',
      A100: '#d5d5d5',
      A400: '#303030',
      A200: '#aaaaaa'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    secondary: {
      // "main": "#C5E1A5",
      // "main": "#6ef790",
      main: '#6ef790',
      // "main": "rgb(110, 247, 144,0.7)",
      // "main": "rgb(113, 244, 113,0.7)",
      light: 'rgb(208, 231, 183)',
      dark: 'rgb(137, 157, 115)',
      contrastText: '#3b3f16'
    },
    common: { black: '#000', white: '#fff' },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    type: 'light',
    action: {
      hoverOpacity: 0.08,
      hover: 'rgba(0, 0, 0, 0.08)',
      selected: 'rgba(0, 0, 0, 0.14)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      active: 'rgba(0, 0, 0, 0.54)'
    },
    terciary: '#AAAAAA', //un verde mio
    primary: {
      // "main": "#A5D6A7", //un verde mio
      "main": "#367844", //geoagro actual
      // "main": "#09aa31",    //otro mio
      // main: '#00C840', //otro mio
      light: '#757ce8',
      dark: '#002884',
      contrastText: '#001900'
    },
    titleBar: {
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, '
    }
  }
})


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
);
