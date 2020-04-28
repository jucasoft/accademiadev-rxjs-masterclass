import {interval, merge, Observable, of} from 'rxjs';
import {concatMap, delay, filter, map, publish, refCount, take, tap} from 'rxjs/operators';

interface IDishes {
    type: 'primo' | 'secondo' | 'contorno',
    name: string
}

const randomNum: (max: number) => number = (max: number) => Math.floor(Math.random() * max)
const rendomDishes: (items: IDishes[]) => IDishes = (items: IDishes[]) => items[randomNum(items.length)]

const dishes: IDishes[] = [
    {
        type: 'primo',
        name: 'pasta'
    },
    {
        type: 'secondo',
        name: 'bistecca'
    },
    {
        type: 'contorno',
        name: 'gelato'
    },
]

const randomInterval$ = (min: number, max: number, count: number) => interval(min).pipe(
    take(count),
    tap(dopoTap => console.log('dopoTap', dopoTap)),
    concatMap(value => of(value).pipe(
        delay(Math.random() * (max - min))
    )),
    tap(emettoValore => console.log('emettoValore', emettoValore)),
)

const orders$ = randomInterval$(10, 3000, 5).pipe(
    map(() => rendomDishes(dishes)),
    tap(piatto => console.log('piatto', piatto.type)),
    publish(),
    refCount()
)

const getShef = (type: string, fn: ({name}: { name:string }) => ({ name: string }), observable: Observable<any>) => {
    return observable.pipe(
        filter(value => value.type === type),
        map(fn)
    )
}

const shef1$ = getShef('primo', ({name}) => ({name}), orders$)
const shef2$ = getShef('secondo', ({name}) => ({name}), orders$)
const shef3$ = getShef('contorno', ({name}) => ({name}), orders$)

const shefs$ = merge(shef1$, shef2$, shef3$).pipe(
    map(value => value.name)
)

export class RistoranteReattivo {

    constructor() {
        this.execute()
    }

    private execute() {

        // randomInterval$(1000, 3000, 5).pipe(
        //     map(() => rendomDishes(dishes)),
        //     pluck('name')
        // ).subscribe(console.log)

        shefs$.subscribe(console.log)
    }
}
