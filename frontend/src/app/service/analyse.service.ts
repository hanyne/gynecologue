import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analyse} from '../model/analyse';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  analyse:Analyse[]=[];
  currentAnalyse: Analyse[] | undefined;

  API_URI = 'http://localhost:4000/analyse';
  constructor(private http:HttpClient ) {}
  //consulte
getAnalyse(searchTerm: string = ''): Observable<Analyse[]> {
    const query = searchTerm ? `?analyseName=${searchTerm}` : '';
    return this.http.get<Analyse[]>(`${this.API_URI}/listAnalyse${query}`);
  }
//view 
find(id: any): Observable<any> {
  return this.http.get(`${this.API_URI}/getAnalyse/${id}`);
}
  //ajout

addAnalyse(analyse:Analyse) :Observable<any>{
    return this.http.post<Analyse>(`${this.API_URI}/saveAnalyse`, analyse)
  }
    //ajout au ordonnance

addAnalyseOrd(analyse:Analyse) :Observable<any>{
  return this.http.post<Analyse>(`${this.API_URI}/saveAnalyseOrd`, analyse)
}
 //supression
 deleteAnalyse(id:String) {
  return this.http.delete(`${this.API_URI}/deleteAnalyse/${id}`);
  }

//modifier
updateAnalyse(id: any, data: any): Observable<any> {

return this.http.put<Analyse>(`${this.API_URI}/updateAnalyse/${id}`, data);
}
get(id: any): Observable<any> {
return this.http.get(`${this.API_URI}/analyseByID/${id}`);
}
//filtrage 
filterAnalyses(analyse:Analyse[],term: string): Analyse[] {
  return this.analyse.filter(analyse =>
    analyse.analyseName.toLowerCase().startsWith(term.toLowerCase())
  );
}
 // Get all carnets
 search(searchTerm: string = '') {
  const query = searchTerm ? `?analyseName=${searchTerm}` : '';
  return this.http.get(`${this.API_URI}${query}`);
}
}