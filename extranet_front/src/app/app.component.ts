import { Component, Renderer2 } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public darkModeEnabled: boolean = false;

  constructor(private authService: AuthService, private renderer: Renderer2) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  changeDarkMode(darkMode: boolean): void {
    this.darkModeEnabled = darkMode;
    if (darkMode) {
      this.renderer.addClass(document.body, 'darkMode');
    } else {
      this.renderer.removeClass(document.body, 'darkMode');
    }
  }
}
