import { useState, useEffect } from 'react';
import { getOnePage } from "../apiProjects";
import {fromFetch} from "rxjs/fetch";
import {catchError, of, switchMap} from "rxjs";

const useDefaultApi = (pageNumber) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [entities, setEntities] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {

    setLoading(true);
    setError(false);

    const defSubscription = getOnePage(pageNumber)
      .subscribe((list) => {
        setEntities(prevEntities => {
          if(prevEntities.length) {
            return [...(prevEntities.slice(3, -1)), ...list.pageList];
          }
          return [...(prevEntities), ...list.pageList];
        });
        setHasMore(list.hasNext);
        setLoading(false);
        console.log('PAGELIST: ', list.pageList);
      })

    return (() => {
      // defSubscription.unsubscribe();
    })

  }, [pageNumber]);

  return [hasMore, error, loading, entities];
};

export default useDefaultApi;