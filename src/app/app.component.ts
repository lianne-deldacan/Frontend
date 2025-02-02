import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDarkMode: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    // Add/remove dark mode class to <body>
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Save user's preference in localStorage
    localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
  }

  ngOnInit() {
    // Check if dark mode is enabled in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
  }
}
