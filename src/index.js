import {BehaviorSubject, fromEvent, merge} from 'rxjs';
import {mapTo} from "rxjs/operators";
import {subLog} from './utils'

function createStore(initialState) {

    const store$ = new BehaviorSubject(initialState);

    function getState() {
        return store$.asObservable();
    }

    function increment() {
        store$.next(store$.getValue() + 1)
    }

    function decrement() {
        store$.next(store$.getValue() - 1)
    }

    return {
        getState: getState,
        increment: increment,
        decrement: decrement
    }
}

const store$ = createStore(0);

store$.getState().subscribe(subLog('store'));

const incState$ = fromEvent(document.querySelector('#increment'), 'click').pipe(mapTo(true));
const decState$ = fromEvent(document.querySelector('#decrement'), 'click').pipe(mapTo(false));

merge(incState$, decState$).subscribe(
    next => {
        if (next) {
            store$.increment();
        } else {
            store$.decrement();
        }
    }
)
