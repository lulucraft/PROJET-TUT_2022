import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CongesComponent } from './main/conges/conges.component';
import { HomeComponent as HomeComponent } from './home/home.component';
import { HomeComponent as Home1Component } from './main/home/home.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './main/account/account.component';
import { CongeRequestComponent } from './main/conge-request/conge-request.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: Home1Component },
      { path: 'account', component: AccountComponent },
      { path: 'conges', component: CongesComponent },
      { path: 'congesrequest', component: CongeRequestComponent }
    ]
  },
  { path: 'login', component: LoginComponent },

  { path: 'account', redirectTo: 'main/account' },
  { path: 'conges', redirectTo: 'main/conges' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
