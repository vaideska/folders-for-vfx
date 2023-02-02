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

  palette: {
    black: {
      main: '#F5F5F5',
      contrastText: '#E2E2E2',
    },
    primary: {
      main: '#252525',
      contrastText: '#CECECE'
    },
    secondary: {
      main: '#252525',
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'black',
          height: '100vh',
          color: '#CECECE',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme, {
  factor: 3,
  breakpoints: ['sm'],
});

theme.typography.body1 = {
  fontSize: '0.85rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.2rem',
  },
};

theme.typography.body2 = {
  fontSize: '0.75rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
};

export { theme };