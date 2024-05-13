import {BehaviorSubject, catchError, of, switchMap, } from 'rxjs';
import {fromFetch} from 'rxjs/fetch';

const apiURL = 'http://localhost:4444/payload';

const getOnePage = (page) => {
  console.log('URL-getOnePage', `${apiURL}/${page}`);
  return fromFetch(`${apiURL}/${page}`, {
    method: 'GET'
  })
    .pipe(
      switchMap(  (response) => {
        if (response.ok) {
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
  getOnePage
};
