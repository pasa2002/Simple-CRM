import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { CustomerComponent } from './customer/customer.component';
import { NotesComponent } from './notes/notes.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { InfoComponent } from './info/info.component';

const redirectLoggedIn = () => redirectUnauthorizedTo(['login']);
const redirectToMain = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToMain),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: SignupComponent,
    ...canActivate(redirectToMain),
  },
  {
    path: '',
    component: MainComponent,
    ...canActivate(redirectLoggedIn),
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'user/:id',
        component: UserDetailComponent,
      },
      {
        path: 'player/:id',
        component: PlayerDetailComponent,
      },
      {
        path: 'player',
        component: CustomerComponent,
      },
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        path: 'imprint',
        component: ImprintComponent,
      },
      {
        path: 'privacy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'info',
        component: InfoComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
