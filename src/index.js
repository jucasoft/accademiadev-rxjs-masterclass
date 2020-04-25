import {interval} from 'rxjs';
import {audit, debounce, sample, tap, throttle} from "rxjs/operators";
import {subLog} from "./utils";

const sourceInterval$ = interval(1000)
/*
interval(200).pipe(
    tap(interval => console.log('interval debounce', interval)),
    debounce(() => sourceInterval$)
).subscribe(subLog('debounce'))

interval(200).pipe(
    tap(interval => console.log('interval throttle', interval)),
    throttle(() => sourceInterval$)
).subscribe(subLog('throttle'))

interval(200).pipe(
    tap(interval => console.log('interval audit', interval)),
    audit(() => sourceInterval$)
).subscribe(subLog('audit'))*/

interval(200).pipe(
    tap(interval => console.log('interval sample', interval)),
    sample(sourceInterval$)
).subscribe(subLog('sample'))
