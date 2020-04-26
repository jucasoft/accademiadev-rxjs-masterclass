import {AsyncSubject, interval, ReplaySubject, Subject} from 'rxjs';
import {multicast} from "rxjs/operators";

const source$ = interval(500).pipe(
    multicast(new Subject())
);

source$.connect();
setTimeout(()=>
source$.subscribe(console.log)
, 2000)

