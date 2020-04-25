import {interval, Observable} from 'rxjs';
// import {takeWhile} from "rxjs/operators";
import {subLog} from "./utils";

function takeWhile(fn) {
    return source$ => new Observable(observer =>
        source$.subscribe(
            {
                next: v => fn(v) ? observer.next() : observer.complete(),
                error: e => observer.error(),
                completion: value => fn(value) ? observer.next() : observer.complete()
            }
        )
    )
}

interval(1000).pipe(
    takeWhile(value => value < 2)
).subscribe(subLog('test'))
