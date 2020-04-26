import {BehaviorSubject, interval, Subject} from 'rxjs';
import {subLog} from './utils'

const source$ = new BehaviorSubject(0);
const other$ = source$.asObservable();
interval(500).subscribe(source$)
other$.subscribe(console.log)

