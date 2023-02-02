import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/system';
import { theme } from './theme/theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CssBaseline>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </CssBaseline>
);

