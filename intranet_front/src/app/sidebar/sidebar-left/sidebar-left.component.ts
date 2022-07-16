import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss', './../sidebar.scss']
})
export class SidebarLeftComponent implements OnInit {

  constructor(private appHeader: HeaderComponent, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.appHeader.leftMenuOpened = false;
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // isUserAdmin(): boolean {
  //   return !!this.authService.currentUserValue && !!this.authService.currentUserValue.role && !!this.authService.currentUserValue.role?.isAdmin;
  // }

  getUserName(): string {
    if (!this.authService.currentUserValue) {
      // Default to display
      return 'Utilisateur';
    }
    return this.authService.currentUserValue?.username;
  }

  account(): void {
    this.appHeader.leftMenuOpened = false;
    this.router.navigate(['account']);
  }

  conges(): void {
    this.appHeader.leftMenuOpened = false;
    this.router.navigate(['/conges']);
  }

  @HostListener('click', ['$event.target'])
  closeSettingsMenu(el: HTMLElement) {
    if (el.className === "sidebar-close-background") {
      // Close left menu
      this.appHeader.leftMenuOpened = false;
    }
  }

}
