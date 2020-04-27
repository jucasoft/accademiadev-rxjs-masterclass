import {fromEvent, merge, Subject} from 'rxjs';
import {mapTo, publish, scan, tap, timeout} from "rxjs/operators";


const actions$ = new Subject();
const initialState = {counter: 0};

const createStore = (initialState, reducer) => {
    const result = actions$.pipe(
        scan(reducer, initialState),
        tap(scanCallbackArg => console.log('scanCallbackArg', scanCallbackArg)),
        publish()
    )
    result.connect();
    return result;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'increment':
            return {counter: state.counter + 1}
        case 'decrement':
            return {counter: state.counter - 1}
    }
}

const store$ = createStore(initialState, reducer);

setTimeout(() => {
    store$.subscribe(console.log);
}, 3000);

const incState$ = fromEvent(document.querySelector('#increment'), 'click').pipe(mapTo(true));
const decState$ = fromEvent(document.querySelector('#decrement'), 'click').pipe(mapTo(false));

merge(incState$, decState$).pipe(
    tap(value => console.log('value', value)),
).subscribe(
    v => actions$.next(v ? {type: 'increment'} : {type: 'decrement'})
)
