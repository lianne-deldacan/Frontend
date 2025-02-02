import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response: any) => {
        Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExendxb2hzYnY0aTVuNGxvamcyNGM4eGNmaWhnOGdkc3RvenVmbjFpZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abAHdYvZdBNnGZq/giphy.gif',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Success Animation',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExendxb2hzYnY0aTVuNGxvamcyNGM4eGNmaWhnOGdkc3RvenVmbjFpZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abAHdYvZdBNnGZq/giphy.gif")
          center center
          no-repeat
        `,
      });


          sessionStorage.setItem('token', JSON.stringify(response.token));
          sessionStorage.setItem('customer', JSON.stringify(response.customer));

          this.router.navigate(['/task']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password';

          Swal.fire({
            title: 'Login Failed',
            text: 'Invalid email or password',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        },
      });
    }
  }
}
