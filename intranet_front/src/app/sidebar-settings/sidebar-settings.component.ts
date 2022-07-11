import { Component, HostListener, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-sidebar-settings',
  templateUrl: './sidebar-settings.component.html',
  styleUrls: ['./sidebar-settings.component.scss']
})
export class SidebarSettingsComponent implements OnInit {

  public toggleDarkMode: boolean = false;

  constructor(private appMain: AppComponent, private appHeader: HeaderComponent) { }

  ngOnInit(): void {
    this.toggleDarkMode = this.appMain.darkModeEnabled;
  }

  changeDarkMode($event: MatSlideToggleChange): void {
    this.appMain.changeDarkMode($event.checked);

    // Timeout to ensure that changeDarkMode executed before
    setTimeout(() => {
      // Close settings menu
      this.appHeader.settingsMenuOpened = false;
    }, 50);
  }

  @HostListener('click', ['$event.target'])
  closeSettingsMenu(el: HTMLElement) {
    if (el.className === "sidebar-close-background") {
      // Close settings menu
      this.appHeader.settingsMenuOpened = false;
    }
  }
}
