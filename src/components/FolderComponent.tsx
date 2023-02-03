import React from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import foldersStore from '../store/folders';
import AddShotDialog from './AddShotDialog';
import DeleteShotDialog from './DeleteShotDialog';

import { IFolder } from '../types/types';


type FolderComponentProps = {
  folder: IFolder;
  children: React.ReactNode;
  parentId: string;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const FolderComponent = ({ folder, children, parentId, activeId, setActiveId }: FolderComponentProps) => {
  const [open, setOpen] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleToggleFolderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleActiveClick = () => {
    if (open && folder.id !== activeId) {
      setActiveId(folder.id);
      return;
    }
    setActiveId(folder.id);
    setOpen(!open);
  }

  const addShot = (name: string) => {
    setOpen(true);
    foldersStore.addFolder({
      id: String(Date.now()),
      name,
      parentId: parentId,
    });
  }

  const deleteShot = () => {
    foldersStore.removeFolder(folder);
  }

  const handleOpenAddDialogClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenAddDialog(true);
  }

  const handleOpenDeleteDialogClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  }

  return (
    <>
      <AddShotDialog open={openAddDialog} setOpen={setOpenAddDialog} addShot={addShot} />
      <DeleteShotDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} deleteShot={deleteShot}/>
      <ListItemButton onClick={handleActiveClick}>
        {open
          ? 
          <IconButton aria-label="close" color="primary" sx={{height: 8}} onClick={handleToggleFolderClick}>
            <KeyboardArrowDownIcon />
          </IconButton>
          :
          <IconButton aria-label="open" color="primary" sx={{height: 8}} onClick={handleToggleFolderClick}>
            <KeyboardArrowRightIcon />
          </IconButton>
          }
        <FolderIcon />
        <ListItemText primary={folder.name} />
          {activeId === folder.id && 
            <>
              <IconButton
                aria-label="add"
                color="primary"
                sx={{height: 8}}
                onClick={handleOpenAddDialogClick}
              >
                <AddBoxIcon />
              </IconButton>
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
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
    </>
  );
};

export default FolderComponent;
