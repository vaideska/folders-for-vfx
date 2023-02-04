import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },

  palette: {
    primary: {
      main: '#CECECE',
    },
    secondary: {
      main: '#B7B7B7'
    }
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: '100vh',
          height: '100%',
          width: '100%',
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
          background: '#202020',
        },
      },
    },
  },
});


export { theme };