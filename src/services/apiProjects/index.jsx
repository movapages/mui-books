import {BehaviorSubject, catchError, of, switchMap,} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';

const apiURL = 'http://localhost:8888/api?';

const generateBookAPIQuery = ( page=1, limit=44) => {
  return `${apiURL}_page=${+page}&_limit=${limit}`;
};

const listInitValue = [];
const ITEMS_AMOUNT = 839;
let currPage = 1, lastItem = 0;

const apiProjects = new BehaviorSubject(listInitValue);

const getDefaultListObservable = () => {

  let currentCall = generateBookAPIQuery();

  return fromFetch(currentCall, {
    method: 'GET',
  })
    .pipe(
      switchMap(  (response) => {
        if (response.ok) {
          console.log('fromFetch-OK: ', response);
          return response.json();
        }
        return of({ error: true, status: response.status, message: 'List fetch failed' });
      }),
      catchError((error) => {
        return of({ error: true, status: error.status, message: error.message });
      }),
    );
};

const getOnePage = (page) => {
  let currentCall = generateBookAPIQuery(page);
  return fromFetch(currentCall, {
    method: 'GET'
  })
    .pipe(
      switchMap(  (response) => {
        if (response.ok) {
          console.log('getOnePage-OK: ', response);
          return response.json();
        }
        return of({ error: true, status: response.status, message: 'List fetch failed' });
      }),
      catchError((error) => {
        return of({ error: true, status: error.status, message: error.message });
      }),
    );
};

export {
  getDefaultListObservable,
  getOnePage
};
