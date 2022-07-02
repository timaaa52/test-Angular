import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Service } from './app.service';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule],
	providers: [Service],
	bootstrap: [AppComponent],
})
export class AppModule {}
