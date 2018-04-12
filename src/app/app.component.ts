import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppEvent } from './app-event';
import { AppCredentials } from './app-credentials';
import { AppInterceptor } from './app-interceptor';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  event: AppEvent;
  subscription: Subscription;
  submitted = false;
  backendError = null;

  model: AppCredentials = new AppCredentials();

  constructor (
    private errorService: ErrorService,
    private restService: AppInterceptor
  ) { }

  onSubmit(data, isValid: boolean) {
    // Really sorry
    const self = this;
    if (isValid) {
      this.backendError = null;
      this.submitted = true;
      this.restService.login(this.model)
      .then( resp => {
        this.backendError = null;
        if (resp.hasOwnProperty('token')) {
          window.alert('Login success!');
        } else {
          window.alert(resp['message']);
        }
      })
      .catch( err => {
        const last_errors = self.errorService.getErrors(2);
        // Она у меня одна
        const errors = last_errors.slice(-1)[0].workload.error.errors;
        errors.forEach( e => {
          this.backendError = e[Object.keys(e)[0]];
        });
      });
    }
  }
}
