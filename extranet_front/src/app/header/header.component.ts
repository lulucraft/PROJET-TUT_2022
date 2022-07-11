import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public settingsMenuOpened: boolean = false;

  constructor() { }

  openSettingsMenu(): void {
    this.settingsMenuOpened = !this.settingsMenuOpened;
  }
}
