import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Secretaire} from '../model/secretaire';
@Injectable({
  providedIn: 'root'
})
export class SecretaireService {

  constructor(private http: HttpClient) { }
  API_URI = 'http://localhost:4000/secretaire';

  getSecretaires(): Observable<any> {
    return this.http.get<Secretaire[]>(`${this.API_URI}/findAll`)
  }
  saveS(sec:Secretaire) :Observable<any>{
    return this.http.post<Secretaire>(`${this.API_URI}/saveS`, sec)
  }
  deleteS(id: String) {
    return this.http.delete(`${this.API_URI}/delete/${id}`);
  }  
  updateS(id: any, data: any): Observable<any> {
    
    return this.http.put<Secretaire>(`${this.API_URI}/update/${id}`, data);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.API_URI}/getS/${id}`);
  }
  logoutUser() {
    localStorage.clear()
    window.location.reload()
  }
}

