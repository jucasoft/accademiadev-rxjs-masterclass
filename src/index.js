import {of, partition} from 'rxjs';
import {filter} from "rxjs/operators";
import {isOdd, subLog} from "./utils";

const source$ = of(1, 2, 3, 4, 5, 6)

// nel caso di filter, passano le emissioni che rispecchiano una determinata condizione, tutte le altre vengono perse.
source$.pipe(
    filter(isOdd)
).subscribe(subLog('filter'))

// utilizzando l'operatore partition, vengono creati due observable a particre da due condizioni.
const [even$, odd$] = partition(source$, isOdd)

even$.subscribe(subLog('even'));
odd$.subscribe(subLog('odd'));
