import React from 'react';
import Container from '@mui/material/Container';
import { Box, Button, ButtonGroup } from '@mui/material';
import FolderList from './components/FolderList';


function App() {
  return (
    <Container disableGutters={true}>
      <Box sx={{
        width: '250px',
        height: '100vh',
        borderRight: '1px solid grey'
      }}>
        <FolderList />

      </Box>
    </Container>
  );
}

export default App;
