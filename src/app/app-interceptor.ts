import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { NotifyService } from './notify.service';
import { AppEvent } from './app-event';
import { AppCredentials } from './app-credentials';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  private _credentials: AppCredentials;

  // suppose we use JWT auth
  private _jwt_token: string = null;

  constructor(
    private notifyService: NotifyService,
    private http: HttpClient
  ) {}

  intercept (
    req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Sorry
    const self = this;
    const headers = {'Content-Type': 'application/json'};
    if (this._jwt_token !== null) {
      headers['Authorization'] = 'JWT ' + this._jwt_token;
    }
    req = req.clone({
      headers: new HttpHeaders(headers)
    });

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        const event = new AppEvent();
        event.type = 'error';
        event.workload = err;
        self.notifyService.addEvent(event);
      }
    });
  }

  get credentials (): AppCredentials {
    return this._credentials;
  }

  set credentials (value: AppCredentials) {
    this._credentials = value;
  }

  get jwt_token (): string {
    return this._jwt_token;
  }

  set jwt_token (value: string) {
    this._jwt_token = value;
  }

  login(credentials: AppCredentials) {
    // Sorry
    const self = this;
    this._credentials = credentials;
    return this.http.post('/api/login', this.credentials).toPromise()
    .then( (response) => {
      if (response.hasOwnProperty('token')) {
        self._jwt_token = response['token'];
      }
      return response;
    })
    .catch( err => {
        return Promise.reject(err);
    });
  }
}
