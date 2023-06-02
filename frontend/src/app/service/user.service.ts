import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Patiente } from '../model/patiente';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser!: User;
  name!: String;
  currentPatiente!: Patiente;
  constructor(private http: HttpClient, private router: Router) { 
      
    }
  API_URI = 'http://localhost:4000/auth';

  logoutUser() {
    localStorage.clear()
    window.location.reload()
  }
  login(user: User): Observable<any> {
    return this.http.post(`${this.API_URI}/signin`, user).pipe(
      map(response => {
        const data = response as any;
        const token = data.token;
        const role = data.role;
        const user = data.user; // Assuming the server returns the user object
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('user', user);
        return response;
      }),
      catchError(error => {
        const errorMessage = error.message || 'Something went wrong. Please try again later.';
        return throwError(errorMessage);
      })
    );
  }
  
  logout() {
    localStorage.removeItem('User');
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    const user = localStorage.getItem('User');
    return user ? JSON.parse(user) : null;
  }
  

  requestReset(body:any): Observable<any> {
    return this.http.post(`${this.API_URI}/ResetPassword`, body);
  }

  //newPassword(resettoken:any, patienteId:any): Observable<any> {
  //  return this.http.post(`${this.API_URI}/NewPassword/${patienteId}/${resettoken}`);
 // }

  ValidPasswordToken(resettoken:any, patienteId:any): Observable<any> {
    return this.http.get(`${this.API_URI}/ValidPasswordToken${patienteId}/${resettoken}`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.API_URI}/profile`).pipe(
      catchError(error => {
        let errorMessage = 'An error occurred. Please try again later.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(errorMessage);
      })
    );
  }
  
  

}
