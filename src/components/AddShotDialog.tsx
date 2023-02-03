import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { Button, DialogActions, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddShotDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  addShot: (name: string) => void;
}

export default function AddShotDialog({ open, setOpen, addShot }: AddShotDialogProps) {
  const [name, setName] = useState('');

  const handleClose = () => {
    setOpen(false);
    setName('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    setName('');
    addShot(name);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <AddBoxIcon/>
          Add shot
          <IconButton aria-label="add" color="primary" sx={{height: 8}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Enter the name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            variant="standard"
            value={name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClick}>Add shot</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
