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
      sx={{ width: '100%', pt: '19px' }}
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
                  <FolderComponent
                    key={innerFolder.id}
                    folder={innerFolder} 
                    parentId={innerFolder.id} 
                    activeId={activeId} 
                    setActiveId={setActiveId}
                  >
                    <Box sx={{mt: '5px'}}>
                      {foldersStore.getLevelChild(innerFolder.id).map(shot => 
                        <ShotComponent
                          key={shot.id}
                          shot={shot}
                          activeId={activeId}
                          setActiveId={setActiveId}
                        />
                      )}
                    </Box>
                  </FolderComponent>
            )})}
          </FolderComponent>
      )})}
    </List>
  );
});

export default FolderList;
