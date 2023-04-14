import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medic} from '../model/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  drug:Medic[]=[];
  currentDrug: Medic[] | undefined;

  API_URI = 'http://localhost:4000/medic';
  constructor(private http:HttpClient ) {}
  //consulte
getDrug(): Observable<any> {
  return this.http.get(`${this.API_URI}/listDrug`);
}
//view 
find(id: any): Observable<any> {
  return this.http.get(`${this.API_URI}/getDrug/${id}`);
}
  //ajout

addDrug(drug:Medic) :Observable<any>{
    return this.http.post<Medic>(`${this.API_URI}/saveDrug`, drug)
  }
    //ajout au ordonnance

addDrugOrd(drug:Medic) :Observable<any>{
  return this.http.post<Medic>(`${this.API_URI}/saveDrugOrd`, drug)
}
 //supression
 deleteDrug(id:String) {
  return this.http.delete(`${this.API_URI}/deleteDrug/${id}`);
  }

//modifier
updateDrug(id: any, data: any): Observable<any> {

return this.http.put<Medic>(`${this.API_URI}/updateDrug/${id}`, data);
}
get(id: any): Observable<any> {
return this.http.get(`${this.API_URI}/drugByID/${id}`);
}
//filtrage 
filterDrugs(drug:Medic[],term: string): Medic[] {
  return this.drug.filter(drug =>
    drug.drugName.toLowerCase().startsWith(term.toLowerCase())
  );
}
}