import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

// Consts
import { environment } from 'environments/environment';

// Store
import { UserState } from '@store/user';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@shared/modules/material.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from '@components/login/login.component';
import { DetailsComponent } from '@components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([UserState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
