import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  authService = inject(AuthService)
  router =  inject(Router)
  toast = inject(HotToastService)

  registerForm : FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    username: new FormControl('',[Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
  });
  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  handleSubmit() {
    this.authService.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        console.log("Response from server:", response); 
        this.router.navigate(['/login']);
        this.toast.success('Đăng ký thành công');
      },
      error: (e) => {
        console.error("Error response:", e);
        this.toast.error('Error: ' + e.message);
      },
    });
  }
}
