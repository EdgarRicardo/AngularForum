import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TopicComponent } from './components/topic/topic.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

//Defining routes
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'logout/:sure', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'home', component:HomeComponent},
  {path: 'userSettings', component:UserEditComponent},
  {path: 'topic/:id', component:TopicComponent},
  {path: '**', component:ErrorComponent},
  {path: 'error', component:ErrorComponent}
];

  //{path: 'settings', component:UserEditComponent, canActivate: [IdentityGuard]}

//Importing configuration
export const routingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

