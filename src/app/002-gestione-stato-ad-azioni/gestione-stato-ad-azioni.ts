import {fromEvent, merge, Subject} from 'rxjs';
import {mapTo, pluck, scan} from 'rxjs/operators';

export interface IState {
    counter: number
}

export interface IAction {
    type: 'increment' | 'decrement';
}

export const initialState: IState = {
    counter: 0
}

export function reducer(state: IState = initialState, action: IAction): IState {
    switch (action.type) {
        case 'decrement':
            return {counter: state.counter - 1}
        case 'increment':
            return {counter: state.counter + 1}
        default:
            return state
    }
}

export const actions$ = new Subject();

export const createStore = (reducer: (state: IState, action: IAction) => IState, initialState: IState) => actions$.pipe(
    scan(reducer, initialState)
)

export class GestioneStatoAdAzioni {

    constructor() {
        this.execute();
    }

    execute() {
        const increment$ = fromEvent(document.querySelector('#increment'), 'click').pipe(mapTo(true));
        const decrement$ = fromEvent(document.querySelector('#decrement'), 'click').pipe(mapTo(false));
        merge(increment$, decrement$).subscribe(
            next => actions$.next(next ? {type: 'increment'} : {type: 'decrement'})
        );
        const store$ = createStore(reducer, initialState);
        store$.pipe(pluck('counter')).subscribe(console.log)
    }
}
