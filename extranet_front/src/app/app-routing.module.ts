import { Injectable, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent as HomeComponent } from './home/home.component';
import { HomeComponent as Home1Component } from './main/home/home.component';
import { HomeComponent as AdminHomeComponent } from './admin/home/home.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './main/account/account.component';
import { AuthGuard } from './guard/auth.guard';
import { Title } from '@angular/platform-browser';
import { AdminComponent } from './admin/admin.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const split = routerState.url.split('/');
    // Title is set from the last url element
    this.title.setTitle(`Extranet | ${split[split.length - 1]}`);
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: Home1Component },
      { path: 'account', component: AccountComponent },
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminHomeComponent },
    ]
  },
  { path: 'login', component: LoginComponent },

  { path: 'account', redirectTo: 'main/account' },

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
