import {IStore, Store} from './store';
import {fromEvent, merge} from 'rxjs';
import {mapTo} from 'rxjs/operators';

export class GestioneStoreBehaviorSubject {

    constructor() {
        this.execute();
    }

    private store$: IStore<number> = new Store(0);

    execute() {

        this.store$.getState().subscribe(console.log);

        const increment$ = fromEvent(document.querySelector('#increment'), 'click').pipe(mapTo(true));
        const decrement$ = fromEvent(document.querySelector('#decrement'), 'click').pipe(mapTo(false));

        merge(increment$, decrement$).subscribe(v => {
            if (v) {
                this.store$.increment();
            } else {
                this.store$.decrement();
            }
        })
    }
}
