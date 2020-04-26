import {AsyncSubject, interval, ReplaySubject, Subject} from 'rxjs';
import {multicast, publish} from "rxjs/operators";

const source$ = interval(500).pipe(
    publish()
);

source$.connect();
setTimeout(()=>
source$.subscribe(console.log)
, 2000)

