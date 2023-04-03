import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:4000/article';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`).pipe(
      catchError(this.handleError)
    );
  }

  addArticle(article: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/new`, article, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteArticle(article: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/destroy`, article, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }

}
