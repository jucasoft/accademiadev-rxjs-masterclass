import {AsyncSubject, interval, ReplaySubject} from 'rxjs';

const source$ = new AsyncSubject(3);
source$.next(1);
source$.next(2);
source$.next(3);
source$.next(4);
source$.next(5);
source$.subscribe(console.log)
source$.complete()

