import {interval} from 'rxjs';
import {sampleTime, tap} from "rxjs/operators";
import {subLog} from "./utils";

const source$ = interval(1000)

source$.pipe(
    tap(interval => console.log('interval', interval)),
    sampleTime(2500)
).subscribe(subLog('sampleTime'))
