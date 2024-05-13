import React, {useCallback, useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import {SimpleTreeView, TreeItem} from "@mui/x-tree-view";

import useDefaultApi from "../../services/useDefaultApi/useDefaultApi";


export default function TreeBrowser() {

  const [current, setCurrent] = useState(1); // current page
  const [hasMore, error, loading, entities] = useDefaultApi(current);

  console.log('entitiesTREE: ', entities);
  const observer = useRef();
  const lastElRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Visible: ', entries[0].isIntersecting);
        setCurrent(prevPageNumber => prevPageNumber+1);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);


  return (
    <Box
      sx={{
        height: '120px',
        maxWidth: '400px',
        border: '1px solid lightgray',
        overflowY: 'scroll',
    }}>
      <SimpleTreeView>

        {entities && entities.map((page, index) => {
          if (index === entities.length - 1) {
            return <TreeItem ref={lastElRef}
              itemId={page.id}
              key={page.id}
              label={page.name}>
              <TreeItem itemId='1' label={'child'}/>
            </TreeItem>
          } else {
            return <TreeItem
              itemId={page.id}
              key={page.id}
              label={page.name}>
              <TreeItem itemId='1' label={'child'}/>
            </TreeItem>
          }
        })}

        {!entities && loading && <small>Loading the list...</small>}

      </SimpleTreeView>
    </Box>
  );
}