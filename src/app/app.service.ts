import { timer, Observable, BehaviorSubject, Subscription, map } from 'rxjs';
import { ITime } from './app.interface';

export class Service {
	initialTime = 0;
	timer$ = new BehaviorSubject(this.initialTime);
	lastTime = this.initialTime;
	isRunning = false;
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
		this.isRunning = false;
	}

	secondsToStopWatch(sec: number): ITime {
		let targetSec = sec % 60;
		const seconds = targetSec;
		const minutes = Math.floor(sec / 60);

		return {
			minutes: this.timeToString(minutes),
			seconds: this.timeToString(seconds),
		};
	}

	timeToString(val: number) {
		return `${val < 10 ? '0' + val : val}`;
	}
}
