import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patiente } from '../model/patiente';

@Injectable({
  providedIn: 'root'
})
export class PatienteService {

  constructor(private http: HttpClient) { }
  API_URI = 'http://localhost:4000/patiente';
  logoutUser() {
    localStorage.clear()
    window.location.reload()
  }
  getP(): Observable<any> {
    return this.http.get<Patiente[]>(`${this.API_URI}/findAll`)
  }
  saveP(pat:Patiente) :Observable<any>{
    return this.http.post<Patiente>(`${this.API_URI}/saveP`, pat)
  }
  getNbP(): Observable<any> {
    return this.http.get<any>(`${this.API_URI}/getP`)
  }
  deleteP(id: String) {
    return this.http.delete(`${this.API_URI}/delete/${id}`);
  }  
  getById(id: any): Observable<any> {
    return this.http.get(`${this.API_URI}/get/${id}`)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.API_URI}/update/${id}`, data);
  }
  updatePassword(id:any ,oldPassword: any, newPassword: any ): Observable<any> {
    return this.http.put(`${this.API_URI}/Update-password/${id}`, { oldPassword, newPassword });
  }
}
