import {interval, Subject} from 'rxjs';
import {subLog} from './utils'

const source$ = new Subject();
const other$ = source$.asObservable();
interval(500).subscribe(source$)

setInterval(()=>
other$.subscribe(console.log)
,2000)
