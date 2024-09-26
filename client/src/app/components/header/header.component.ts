import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  router = inject(Router);
  username: string | null = null;
  loggedIn: boolean = false; // Biến theo dõi trạng thái đăng nhập
  authService = inject(AuthService);

  ngOnInit() {
    // Lắng nghe sự thay đổi của username từ AuthService
    this.authService.username$.subscribe((username) => {
      this.username = username;
    });
    // Lắng nghe sự thay đổi của trạng thái đăng nhập
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
