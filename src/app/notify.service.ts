import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppEvent } from './app-event';

@Injectable()
export class NotifyService {

  private event: Subject<AppEvent> = new Subject<AppEvent>();

  constructor () { }

  sendMessage (message: string) {
    const event = new AppEvent();
    event.type = 'message';
    event.workload = message;
    this.event.next(event);
  }

  addEvent (event: AppEvent) {
    this.event.next(event);
  }

  getEvent (): Observable<AppEvent> {
    return this.event.asObservable();
  }
}
