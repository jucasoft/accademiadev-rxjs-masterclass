import {Subject} from 'rxjs';
import {subLog} from './utils'

const source$ = new Subject(1);

source$.subscribe(console.log)
source$.next(1)
source$.subscribe(console.log)
source$.subscribe(console.log)
source$.next(1)
source$.subscribe(console.log)
