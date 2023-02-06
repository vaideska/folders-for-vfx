import React from 'react';
import {
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { IFolder } from '../types/types';

type DeleteFolderDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteFolder: () => void;
  folder: IFolder;
}

const DeleteFolderDialog = ({ open, setOpen, deleteFolder, folder }: DeleteFolderDialogProps) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: { borderRadius: 0, height: '193px', width: '435px' }}}
    >
      <DialogTitle
        id="alert-dialog-title"
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
          <DeleteIcon color='secondary' sx={{ height: '12px' }} />
          <Typography sx={{color: 'white', fontSize: '16px', fontWeight: '300', pl: '2px'}}>
            Delete sequence
          </Typography>
        </Box>

        <IconButton aria-label="add" color="primary" onClick={handleClose}>
          <CloseIcon sx={{height: '15px'}}  />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{background: '#252525', width: '435px', p: '0 10px 0 15px'}}>
        <DialogContentText id="alert-dialog-description" sx={{ mt: '20px'}}>
          <Typography 
            sx={{
              color: '#CECECE',
              fontWeight: 300,
              fontSize: '13px',
              textAlign: 'center',
              lineHeight: '16px',
              mb: '16px'
            }}
          >
            The sequence<Typography sx={{fontWeight: 500}}>{folder.name}</Typography> and related objects will be permanently deleted and cannot be restored.</Typography>
          <Typography
            sx={{
              color: '#CECECE',
              fontWeight: 300,
              fontSize: '13px',
              textAlign: 'center',
              lineHeight: '16px'
            }}
          >
            Are you sure you want to continue?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{background: '#252525', pb: '15px', pl: '20px' }}>
        <Button
          sx={{
            p: 0,
            fontSize: '13px',
            fontWeight: 400,
            height: '25px',
            width: '50%',
            background: '#3D3D3D',
            color: '#BFBFBF',
            textTransform: 'none',
            borderRadius: '3px'
          }}
          onClick={handleClose}>
            Cancel
          </Button>
        <Button
          sx={{
            p: 0,
            fontSize: '13px',
            fontWeight: 400,
            height: '25px',
            width: '50%',
            background: '#FF005C',
            color: '#353535',
            textTransform: 'none',
            borderRadius: '3px'
          }}
          onClick={deleteFolder}
          autoFocus
        >
          <DeleteIcon sx={{width: '12px', mr: '5px'}} />
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteFolderDialog;
