import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { getDefaultListObservable, getOnePage } from "../../services/apiProjects";
import { distinctUntilChanged, fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";

export default function TreeBrowser() {

  const startPage = 1;
  let curPage = 0;

  const ENTITIES= [{
      id: 'grid',
      label: 'Empty List'
    }];

  let [entities, setEntities] = useState(ENTITIES);
  const ref = useRef(null);

  let scrollEvent$ = null;
  let onePageSubscription = null;

  let scrollTop = 0;

  const onItemFocus = (e) => {
    console.log('onItemFocus-e: ', e);
  };

  useEffect(() => {

    function handleScroll(e) {
      const currTop = e.target.scrollTop;
      let direction = 'down';
      if(currTop > scrollTop) {
        direction = 'down'
      } else {
        direction = 'up'
      }
      scrollTop = currTop;
      return direction;
    }

    scrollEvent$ = fromEvent(ref.current, 'scroll')
      .pipe(
        map(handleScroll),
        // tap((msg) => console.log('fromTAP: ', msg)),
        distinctUntilChanged(
          (a,b) => JSON.stringify(a).split('').sort().join('') === JSON.stringify(b).split('').sort().join(''))
      );

    const subScrolEvent = scrollEvent$.subscribe((value) => {
      console.log('subScrolEvent: ', value);
      (value === 'down') && (curPage += 1);
      ((value === 'up') && (curPage > 1) ) && (curPage -= 1);

      onePageSubscription = getOnePage(curPage)
        .subscribe((list) => {
          setEntities([...list]);
      });

    });

    const defSubscription = getDefaultListObservable()
      .subscribe((list) => {
        setEntities(list);
        curPage = startPage;
      })

    return (() => {
      defSubscription.unsubscribe();
      subScrolEvent.unsubscribe();
      onePageSubscription.unsubscribe();
    })

  }, []);


  return (
    <Box ref={ref}
      sx={{
        height: '700px',
        border: '1px solid lightgray',
        overflowY: 'scroll',
    }}>
      <RichTreeView items={entities} onFocus={(e) => onItemFocus(e)} />
    </Box>
  );
}