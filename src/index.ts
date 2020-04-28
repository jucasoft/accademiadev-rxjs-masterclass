import './style.css'
import {animationFrameScheduler, interval} from 'rxjs';
import {observeOn, take} from 'rxjs/operators';


const elem = <HTMLElement>document.querySelector('#unbelnome');


// interval(1, animationFrameScheduler).pipe(
//     take(300)
// ).subscribe(
//     function test(n) {
//         elem.style.height = n + 'px';
//     }
// )

interval(1).pipe(
    take(300),
    observeOn(animationFrameScheduler)
).subscribe(n => elem.style.height = n + 'px')

