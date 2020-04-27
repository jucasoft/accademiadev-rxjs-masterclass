import {fromEvent, merge, Subject} from 'rxjs';
import {mapTo, scan} from "rxjs/operators";

const actions$ = new Subject();
const initialState = {
    counter: 0
}

actions$.subscribe(console.log)

const createStore = (initialState, reducer) => actions$.pipe(
    scan(reducer, initialState)
)
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'increment':
            return {counter: state.counter + 1}
        case 'decrement':
            return {counter: state.counter - 1}
    }
    return state;
}

const store$ = createStore(initialState, reducer);
store$.subscribe(console.log)

const incState$ = fromEvent(document.querySelector('#increment'), 'click').pipe(mapTo(true));
const decState$ = fromEvent(document.querySelector('#decrement'), 'click').pipe(mapTo(false));

merge(incState$, decState$).subscribe(
    next => {
        actions$.next(next ? {type: 'increment'} : {type: 'decrement'});
    }
)
