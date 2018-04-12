import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { NotifyService } from './notify.service';
import { AppEvent } from './app-event';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorService implements OnDestroy {

  errors: AppEvent[] = [];
  last_error: Subject<AppEvent> = new Subject<AppEvent>();
  subscription: Subscription;

  constructor (private notifyService: NotifyService) {
    this.subscription = this.notifyService.getEvent().subscribe(event => {
      if (event.type === 'error') {
        this.errors.push(event);
        this.last_error.next(event);
      }
    });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  getErrors(lenght: number): AppEvent[] {
    return this.errors.slice(-length);
  }
}
