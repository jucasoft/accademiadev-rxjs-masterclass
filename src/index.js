import {interval} from 'rxjs';
import {auditTime, tap} from "rxjs/operators";
import {subLog} from "./utils";

const source$ = interval(1000);

source$.pipe(
    tap(interval => console.log('interval', interval)),
    auditTime(2500)
).subscribe(subLog('auditTime'))
