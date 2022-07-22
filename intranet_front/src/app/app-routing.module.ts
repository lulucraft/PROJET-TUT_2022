import { Injectable, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CongesComponent } from './main/conges/conges.component';
import { CongesComponent as AdminCongesComponent } from './admin/conges/conges.component';
import { HomeComponent as HomeComponent } from './home/home.component';
import { HomeComponent as Home1Component } from './main/home/home.component';
import { HomeComponent as AdminHomeComponent } from './admin/home/home.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './main/account/account.component';
import { CongeRequestComponent } from './main/conge-request/conge-request.component';
import { AuthGuard } from './guard/auth.guard';
import { Title } from '@angular/platform-browser';
import { CongeValidationComponent } from './admin/conge-validation/conge-validation.component';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const split = routerState.url.split('/');
    // Title is set from the last url element
    this.title.setTitle(`Intranet | ${split[split.length - 1]}`);
  }
}

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
  {
    path: 'admin', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'conges', component: AdminCongesComponent },
      { path: 'congevalidation', component: CongeValidationComponent }
    ]
  },
  { path: 'login', component: LoginComponent },

  { path: 'account', redirectTo: 'main/account' },
  { path: 'conges', redirectTo: 'main/conges' },
  { path: 'adminconges', redirectTo: 'admin/conges' },

  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules, useHash: false })],
  exports: [RouterModule],
  providers: [
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy }
  ]
})
export class AppRoutingModule { }
