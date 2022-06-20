import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() { }
  isDarkMode: boolean | null = null;
  ngOnInit(): void {
    if (localStorage.getItem("theme") == null) {
      this.isDarkMode = false;
      localStorage.setItem("theme", "light")
    }

    if (localStorage.getItem("theme") == "light") {
      this.isDarkMode = false;
    }

    if (localStorage.getItem("theme") == "dark") {
      this.isDarkMode = true;
    }
  }
  changeTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (!this.isDarkMode) localStorage.setItem("theme", "light")
    if (this.isDarkMode) localStorage.setItem("theme", "dark")
  }
}
