import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  imports: [MatMenu, MatMenuModule, MatButtonModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {
  constructor(private readonly router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
