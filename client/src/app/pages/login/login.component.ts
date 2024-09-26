import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService)
  router =  inject(Router)
  toast = inject(HotToastService)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
  });
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.accessToken); // Lưu token
        this.authService.setUsername(data.user.username); // Cập nhật username
        this.router.navigateByUrl('/');
        this.toast.success('Login successfully');
      },
      error: (e) => {
        this.toast.error('Error: ' + e.message);
      },
    });
  }
}