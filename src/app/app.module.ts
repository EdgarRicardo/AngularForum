import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, routingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ErrorComponent } from './components/error/error.component';
import { GeneralTopicsComponent } from './components/general-topics/general-topics.component';
import { DataTablesModule } from 'angular-datatables';
import { TopicComponent } from './components/topic/topic.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ProfileComponent,
    UserEditComponent,
    ErrorComponent,
    GeneralTopicsComponent,
    TopicComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    routingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
