import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://backend-xszn.onrender.com/api/auth/login'; // Update with your working API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }

  signup(firstName: string, lastName: string, email: string, password: String): Observable<any> {
    return this.http.post('https://backend-xszn.onrender.com/api/auth/signup', { firstName, lastName, email, password });
  } 
}
