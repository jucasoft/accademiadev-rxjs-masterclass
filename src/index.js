import {BehaviorSubject, fromEvent, merge} from 'rxjs';
import {mapTo} from "rxjs/operators";
import {subLog} from "./utils";

function createStore(initialState) {

    const state$ = new BehaviorSubject(initialState);

    function increment() {
        state$.next(state$.getValue() + 1)
    }

    function decrement() {
        state$.next(state$.getValue() - 1)
    }

    return {
        getState: () => state$.asObservable(),
        increment: () => increment(),
        decrement: () => decrement(),
    }
}

const store = createStore(0);
store.getState().subscribe(subLog('store'));

const sourceInc$ = fromEvent(document.querySelector('#increment'), 'click').pipe(mapTo(true));
const sourceDec$ = fromEvent(document.querySelector('#decrement'), 'click').pipe(mapTo(false));

merge(sourceInc$, sourceDec$).subscribe(next => {
    if (next) {
        store.increment();
    } else {
        store.decrement();
    }
})
