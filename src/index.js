import {interval} from 'rxjs';
import {throttleTime} from "rxjs/operators";
import {subLog} from "./utils";


const source$ = interval(1000);
source$.pipe(
    throttleTime(2000)
).subscribe(subLog('throttleTime'))
