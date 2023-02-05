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
import { Box } from '@mui/material';

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
    setActiveId(null);
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
    <Box>
      <AddShotDialog open={openAddDialog} setOpen={setOpenAddDialog} addShot={addShot} />
      <DeleteShotDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} deleteShot={deleteShot} folder={folder}/>
      <ListItemButton onClick={handleActiveClick} sx={{height: '26px',  pl: folder.parentId ? 2 : 0, pr: '10px', borderRight: activeId === folder.id ? '1px solid #FFB800' : '0px', background: activeId === folder.id ? '#2E2E2E' : null }}>
        {open
          ? 
          <IconButton sx={{pr: '3px' }} aria-label="close" color="secondary" onClick={handleToggleFolderClick}>
            <KeyboardArrowDownIcon  sx={{width: '11px'}} />
          </IconButton>
          :
          <IconButton sx={{pr: '3px' }} aria-label="open" color="secondary" onClick={handleToggleFolderClick}>
            <KeyboardArrowRightIcon sx={{width: '11px'}}  />
          </IconButton>
          }
        <FolderIcon sx={{width: '15px', mr: '7px', color: '#FFEBB7'}} />
        <ListItemText primary={folder.name} primaryTypographyProps={{ color: 'primary', noWrap: true }}  />
          {activeId === folder.id && 
            <>
              <IconButton
                aria-label="add"
                color="secondary"
                sx={{padding: '4px'}}
                onClick={handleOpenAddDialogClick}
              >
                <AddBoxIcon sx={{width: '11px'}} />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="secondary"
                sx={{padding: '4px' }}
                onClick={handleOpenDeleteDialogClick}
              >
                <DeleteIcon sx={{width: '11px'}}  />
              </IconButton>
            </>
          }
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
    </Box>
  );
};

export default FolderComponent;
