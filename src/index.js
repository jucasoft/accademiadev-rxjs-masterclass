import {interval, ReplaySubject, Subject} from 'rxjs';
import {multicast, refCount, share, shareReplay, take} from "rxjs/operators";
import {subLog} from "./utils";

const source$ = interval(500).pipe(
    take(3),
    // multicast(() => new Subject()),
    // refCount()
    share() // equivale a scrivere le righe precedenti.
);

setTimeout(() =>
        source$.subscribe(subLog('source$ a').next)
    , 1000)
setTimeout(() =>
        source$.subscribe(subLog('source$ b').next)
    , 2000)

const sourceB$ = interval(500).pipe(
    take(3),
    // multicast(() => new ReplaySubject()),
    // refCount()
    shareReplay() // equivale a scrivere le righe precedenti.
);

setTimeout(() =>
        sourceB$.subscribe(subLog('sourceB a').next)
    , 1000)
setTimeout(() =>
        sourceB$.subscribe(subLog('sourceB b').next)
    , 2000)
