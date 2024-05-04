import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { getDefaultListObservable } from "../../services/apiProjects";
import {Paper} from "@mui/material";

export default function TreeBrowser() {

  const ENTITIES= [{
      id: 'grid',
      label: 'Empty List'
    }];

  let [entities, setEntities] = useState(ENTITIES);

  const ref = useRef();

  const handleScroll = (e) => {
    console.log('E: ', e);
  };

  useEffect(() => {

    const defSubscription = getDefaultListObservable()
      .subscribe((list) => {
        setEntities(list);
      })

    return (() => defSubscription.unsubscribe())

  }, []);

  return (
    <Box
      onScroll={(e) => handleScroll(e)}
      sx={{ height: '1200px', border: '1px solid lightgray', overflowY: 'scroll' }}>
      <RichTreeView items={entities} />
    </Box>
  );
}