import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, take, tap } from 'rxjs';
import { ITime } from './app.interface';
import { Service } from './app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
	timer: ITime;
	subscriptions = new Subscription();
	dbClickSubscription = new Subscription();
	@ViewChild('dbClick') dbClick?: ElementRef;

	constructor(private timeService: Service) {
		this.subscriptions.add(
			timeService.StopWatch$.subscribe((val: ITime) => (this.timer = val))
		);
	}

	startTimer() {
		this.timeService.startCount();
	}

	stopTimer() {
		this.timeService.resetCount();
	}

	waitTimer() {
		this.timeService.stopCount();
	}

	resetTimer() {
		this.timeService.resetCount();
		this.timeService.startCount();
	}

	dbClickCheck() {
		let lastClickTime = 0;
		this.dbClickSubscription = fromEvent(
			this.dbClick?.nativeElement,
			'click'
		)
			.pipe(
				take(2),
				tap((v) => {
					let clickTimeNow = new Date().getTime();
					if (clickTimeNow < lastClickTime + 500)
						console.log(lastClickTime);
					lastClickTime = clickTimeNow;
				})
			)
			.subscribe();
	}

	ngOnDestroy(): void {}
}
