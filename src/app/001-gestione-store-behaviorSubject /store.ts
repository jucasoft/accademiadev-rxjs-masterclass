import {BehaviorSubject, Observable} from 'rxjs';

export interface IStore<T> {
    getState: () => Observable<T>;
    increment: () => void;
    decrement: () => void;
}

export class Store implements IStore<number> {

    private _store$: BehaviorSubject<number>

    constructor(initialState: number) {
        this._store$ = new BehaviorSubject<number>(initialState);
    }

    public getState(): Observable<number> {
        return this._store$.asObservable();
    }

    public decrement(): void {
        this._store$.next(this._store$.getValue() - 1);
    }

    public increment(): void {
        this._store$.next(this._store$.getValue() + 1);
    }

}
