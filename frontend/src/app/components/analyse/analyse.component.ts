import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Analyse} from 'src/app/model/analyse';
import{AnalyseService} from 'src/app/service/analyse.service';
import {MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent {
  analyse!:Analyse;
  analyseForm!:FormGroup;
  constructor (private Analyse:AnalyseService, 
   private formBuilder : FormBuilder,){
   this.analyseForm = this.formBuilder.group({
    analyseName: ['', Validators['required']],
                  })};
   ngOnInit(): void{  }
   addAnalyse(): any {
    this.Analyse.addAnalyse(this.analyseForm.value)
    .subscribe({
      next: (response) => {
        if (response.success) {
          alert("Les informations sont enregistrées avec succès");
        } else {
          alert(" Les informations  sont enregistrées");
        }
      },
      error: (err) => {
        alert("Attention! Les informations ne sont pas enregistrées");
        console.error(err); // affiche l'erreur dans la console pour le débogage
      }
    });
}
}