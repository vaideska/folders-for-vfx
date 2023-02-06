import React, { useCallback, FC } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton
} from '@mui/material';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';

import foldersStore from '../store/folders';
import AddShotDialog from './AddFolderDialog';
import DeleteShotDialog from './DeleteFolderDialog';

import { IFolder } from '../types/types';

type FolderComponentProps = {
  folder: IFolder;
  children: React.ReactNode;
  parentId: string;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const FolderComponent: FC<FolderComponentProps>  = ({ folder, children, parentId, activeId, setActiveId }) => {
  const [open, setOpen] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const addFolder = useCallback((name: string) => {
    setOpen(true);
    foldersStore.addFolder({
      id: String(Date.now()),
      name,
      parentId: parentId,
    });
  }, [parentId]);

  const deleteFolder = useCallback(() => {
    foldersStore.removeFolder(folder);
    setActiveId(null);
  }, [folder, setActiveId]);

  const handleToggleFolderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleActiveClick = useCallback(() => {
    if (open && folder.id !== activeId) {
      setActiveId(folder.id);
      return;
    }
    setActiveId(folder.id);
    setOpen(!open);
  }, [activeId, folder.id, open, setActiveId]);

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
      <AddShotDialog open={openAddDialog} setOpen={setOpenAddDialog} addFolder={addFolder} />
      <DeleteShotDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        deleteFolder={deleteFolder}
        folder={folder}
      />
      <ListItemButton onClick={handleActiveClick} sx={{height: '26px',  pl: folder.parentId ? 2 : 0, pr: '10px', borderRight: activeId === folder.id ? '1px solid #FFB800' : '0px', background: activeId === folder.id ? '#2E2E2E' : null }}>
        {open
          ? 
          <IconButton
            sx={{pr: '3px' }}
            aria-label="close"
            color="secondary"
            onClick={handleToggleFolderClick}
          >
            <KeyboardArrowDownIcon  sx={{width: '11px'}} />
          </IconButton>
          :
          <IconButton
            sx={{pr: '3px' }}
            aria-label="open"
            color="secondary"
            onClick={handleToggleFolderClick}
          >
            <KeyboardArrowRightIcon sx={{width: '11px'}}  />
          </IconButton>
          }
        <FolderIcon sx={{width: '15px', mr: '7px', color: '#FFEBB7'}} />
        <ListItemText
          primary={folder.name}
          primaryTypographyProps={{ color: 'primary', noWrap: true }}
        />
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
