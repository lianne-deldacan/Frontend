import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;

      this.authService.signup(firstName, lastName, email, password).subscribe({
        next: (response: any) => {
        Swal.fire({
          title: 'Signup Successful!',
          text: 'You can now log in.',
          imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExendxb2hzYnY0aTVuNGxvamcyNGM4eGNmaWhnOGdkc3RvenVmbjFpZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abAHdYvZdBNnGZq/giphy.gif',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Signup Success Animation',
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


          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup failed:', error);
          this.errorMessage = 'An error occurred during signup';

          Swal.fire({
            title: 'Signup Failed',
            text: 'Please check your details and try again.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        },
      });
    }
  }
}
