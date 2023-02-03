import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    black: Palette['primary'];
  }
  interface PaletteOptions {
    black: PaletteOptions['primary'];
  }
}

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1328,
      xl: 1536,
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: '100vh',
          padding: 0,
          boxSizing: 'border-box'
        },
      },
    },
  },
});


export { theme };