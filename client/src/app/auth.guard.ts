import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  toast = inject(HotToastService)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
    const userRole = this.authService.getUserRole();
  
    console.log('Token:', token); 
    console.log('User Role:', userRole); 
  
    if (token && userRole === 'admin') {
      return true; 
    }
    this.toast.error('bạn không quyền truy cập vào trang này');
    this.router.navigate(['/login']); 
    return false;
  }
  
}
