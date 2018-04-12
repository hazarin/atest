import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NotifyService } from './notify.service';
import { ErrorService } from './error.service';
import { AppInterceptor } from './app-interceptor'; // Он же rest service

// Валидатор для примера на подтверждение пароля при регистрации
// Проверяет на совпадение паролей при регистрацции
import { EqualValidator } from './equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    EqualValidator,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AppInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: AppInterceptor,
      multi: true
    },
    NotifyService,
    ErrorService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
