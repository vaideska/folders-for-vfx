import React from 'react';
import Container from '@mui/material/Container';
import { Box, Button, ButtonGroup } from '@mui/material';
import FolderList from './components/FolderList';


function App() {
  return (
    <Container disableGutters={true}>
      <Box sx={{
        width: '249px',
        height: '100vh',
        background: '#252525'
      }}>
        <FolderList />

      </Box>
    </Container>
  );
}

export default App;
