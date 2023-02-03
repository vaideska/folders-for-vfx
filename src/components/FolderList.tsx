import React, { useState } from 'react';

import List from '@mui/material/List';
import FolderComponent from './FolderComponent';
import ShotComponent from './ShotComponent';
import foldersStore from '../store/folders';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';

const FolderList = observer(() => {
  const [activeId, setActiveId] = useState<null | string>(null);

  return (
    <List
      sx={{ width: '100%' }}
      component="nav"
    >
      {foldersStore.level1.map(folder => {
        return (
          <FolderComponent
            key={folder.id} 
            folder={folder} 
            parentId={folder.id} 
            activeId={activeId} 
            setActiveId={setActiveId}
          >
            {foldersStore.getLevelChild(folder.id).map(innerFolder => {
              return (
                <Box key={innerFolder.id} sx={{paddingLeft: '20px'}}>
                  <FolderComponent
                    folder={innerFolder} 
                    parentId={innerFolder.id} 
                    activeId={activeId} 
                    setActiveId={setActiveId}
                  >
                    {foldersStore.getLevelChild(innerFolder.id).map(shot => 
                    <Box key={shot.id} sx={{paddingLeft: '20px'}}>
                      <ShotComponent
                        shot={shot}
                        activeId={activeId}
                        setActiveId={setActiveId}
                      />
                    </Box>
                    )}
                  </FolderComponent>
                </Box>
            )})}
          </FolderComponent>
      )})}
    </List>
  );
});

export default FolderList;
