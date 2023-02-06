import React, { useState } from 'react';
import { 
  Box,
  Button,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddFolderDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  addFolder: (name: string) => void;
}

const AddFolderDialog = ({ open, setOpen, addFolder }: AddFolderDialogProps) => {
  const [name, setName] = useState('');

  const handleClose = () => {
    setOpen(false);
    setName('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name === '') return;
    setOpen(false);
    setName('');
    addFolder(name);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: { borderRadius: 0, height: '120px' }
      }}
    >
      <DialogTitle
        sx={{
          background: '#2A2A2A',
          p: '1px 5px 0 12px',
          height: '40px',
          width: '435px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box component='div' sx={{display: 'flex', alignItems: 'center' }} >
          <AddBoxIcon color='secondary' sx={{ height: '12px' }} />
          <Typography
            sx={{color: 'white', fontSize: '16px', fontWeight: '300', pl: '2px'}}
          >
            Add shot
          </Typography>
        </Box>
        <IconButton aria-label="add" color="secondary" onClick={handleClose}>
          <CloseIcon sx={{height: '15px'}} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{background: '#252525', width: '435px', p: '0 10px 15px 15px'}}>
        <DialogContentText sx={{color: '#CECECE', fontWeight: 300, fontSize: '14px', mt: '12px'}}>
          Enter the name:
        </DialogContentText>
        <Box component="div" sx={{display: 'flex', flexShrink: 1, margin: '7px 0 0 0'}}>
          <TextField
            required
            id="name"
            value={name}
            fullWidth
            autoFocus
            onChange={handleChange}
            InputProps={{style: { height: '25px', padding: 0, border: '1px solid #333333', background: '#232323', color: '#E2E2E2'}}}
          />
          <Button onClick={handleAddClick} sx={{p: 0, fontSize: '13px', fontWeight: '400', height: '25px', width: '128px', background: '#00FFBE', ml: '7px', color: '#353535', textTransform: 'none', borderRadius: '3px' }} >
            <AddBoxIcon sx={{ height: '12px', color: '#353535' }} />
            Add shot
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddFolderDialog;
