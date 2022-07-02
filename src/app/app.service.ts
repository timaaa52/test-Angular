import { timer, Observable, BehaviorSubject, Subscription, map } from 'rxjs';
import { ITime } from './app.interface';

export class Service {
	initialTime = 0;
	timer$ = new BehaviorSubject(this.initialTime);
	lastTime = this.initialTime;
	isRunning = false;
	intervalSec = 0;
	timerSubscription = new Subscription();

	get StopWatch$(): Observable<ITime> {
		return this.timer$.pipe(
			map((seconds: number): ITime => this.secondsToStopWatch(seconds))
		);
	}

	startCount() {
		if (this.isRunning) return;
		this.timerSubscription = timer(0, 1000)
			.pipe(
				map((v: number) => {
					console.log(v);
					return v + this.lastTime;
				})
			)
			.subscribe(this.timer$);
		this.isRunning = true;
	}

	stopCount() {
		this.lastTime = this.timer$.value;
		this.timerSubscription.unsubscribe();
		this.isRunning = false;
	}

	resetCount() {
		this.timerSubscription.unsubscribe();
		this.lastTime = this.initialTime;
		this.timer$.next(this.initialTime);
	}

	secondsToStopWatch(sec: number): ITime {
		let rest = sec % 1;
		if (sec % 6 === 0) this.intervalSec = Math.floor(sec / 60);
		const seconds = this.intervalSec % 6;
		rest = sec % 3600;
		const minutes = Math.floor(rest / 60);

		return {
			minutes: this.timeToString(minutes),
			seconds: this.timeToString(seconds),
		};
	}

	timeToString(val: number) {
		return `${val < 10 ? '0' + val : val}`;
	}
}
