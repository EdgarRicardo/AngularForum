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
import { NewTopicComponent } from './components/new-topic/new-topic.component';
import { MomentModule } from 'angular2-moment';
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from 'ngx-highlightjs';
import { AngularEditorModule } from '@kolkov/angular-editor';

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
    TopicComponent,
    NewTopicComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    MomentModule,
    HighlightModule,
    AngularEditorModule,
    FormsModule
  ],
  providers: [
    routingProviders,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
        lineNumbers: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
