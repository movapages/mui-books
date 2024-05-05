import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
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
  const [direction, setDirection] = useState('down');
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  let scrollTop = 0;

  const onItemFocus = (e) => {
    console.log('onItemFocus-e: ', e);
  };

  useEffect(() => {
    console.log('Direction: ', direction);
  }, [direction]);

  useEffect(() => {

    function handleScroll(e) {
      const currTop = e.target.scrollTop;
      console.log(`curr: ${currTop}  prev: ${scrollTop}`);
      if(currTop > scrollTop) {
        setDirection('down');
      } else {
        setDirection('up');
      }
      scrollTop = currTop;
    }

    ref.current.addEventListener('scroll', handleScroll);

    const defSubscription = getDefaultListObservable()
      .subscribe((list) => {
        setEntities(list);
      })

    return (() => {
      defSubscription.unsubscribe();
      ref.current.removeEventListener('scroll', handleScroll);
    })

  }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsIntersecting(entry.isIntersecting)
  //       if (entry.isIntersecting) {
  //         console.log('Intersecting: ', entry.isIntersecting);
  //         console.log('entry: ', entry);
  //         console.log('ref: ', ref.current.lastChild);
  //       }
  //     }
  //   );
  //   observer.observe(ref.current);
  //   return () => observer.disconnect();
  // }, []);

  return (
    <Box ref={ref}
      sx={{ height: '1200px', border: '1px solid lightgray', overflowY: 'scroll' }}>
      <RichTreeView items={entities} onFocus={(e) => onItemFocus(e)} />
    </Box>
  );
}