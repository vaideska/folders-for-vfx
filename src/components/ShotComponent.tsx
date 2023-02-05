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
    setActiveId(null);
  }

  const handleOpenDeleteDialogClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  }

  const handleOpenClick = () => {
    setActiveId(shot.id);
  };


  return (
    <ListItemButton sx={{ pl: 7, pr: '10px', height: '26px', mt: '2px', borderRight: activeId === shot.id ? '1px solid #FFB800' : '0px', background: activeId === shot.id ? '#2E2E2E' : null }} color='primary' onClick={handleOpenClick}>
    <DeleteShotDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} deleteShot={deleteShot} folder={shot}/>
      <MovieIcon sx={{width: '15px', mr: '7px', color: '#FFEBB7'}} />
      <ListItemText primary={shot.name} primaryTypographyProps={{ color: 'primary',  noWrap: true}}/>
      {activeId === shot.id && 
        <>
          <IconButton
            aria-label="delete"
            color="primary"
            sx={{padding: '4px' }}
            onClick={handleOpenDeleteDialogClick}
          >
            <DeleteIcon sx={{width: '11px'}} />
          </IconButton>
        </>
      }
    </ListItemButton>      
  );
});

export default ShotComponent;
