import {AsyncSubject, from, interval, ReplaySubject, Subject} from 'rxjs';
import {multicast, publish, refCount} from "rxjs/operators";

const source$ = from('loremipsum').pipe(
    publish(),
    refCount()
);

setTimeout(()=>
source$.subscribe(console.log)
, 1000)
setTimeout(()=>
source$.subscribe(console.log)
, 2000)

