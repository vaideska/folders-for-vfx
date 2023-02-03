import React, { memo } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MovieIcon from '@mui/icons-material/Movie';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteShotDialog from './DeleteShotDialog';
import foldersStore from '../store/folders';
import { IFolder } from '../types/types';

type ShotComponentProps = {
  shot: IFolder;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const ShotComponent = memo(({ shot, setActiveId, activeId }: ShotComponentProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const deleteShot = () => {
    foldersStore.removeFolder(shot);
  }

  const handleOpenDeleteDialogClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  }

  const handleOpenClick = () => {
    setActiveId(shot.id);
  };


  return (
    <ListItemButton sx={{ pl: 4 }} onClick={handleOpenClick}>
    <DeleteShotDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} deleteShot={deleteShot}/>
      <MovieIcon />
      <ListItemText primary={shot.name} />
      {activeId === shot.id && 
        <>
          <IconButton
            aria-label="delete"
            color="primary"
            sx={{height: 8}}
            onClick={handleOpenDeleteDialogClick}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    </ListItemButton>      
  );
});

export default ShotComponent;
