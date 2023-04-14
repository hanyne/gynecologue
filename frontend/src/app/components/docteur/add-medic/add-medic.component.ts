import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Medic} from 'src/app/model/medic';
import{MedicService} from 'src/app/service/medic.service';
import {MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-add-medic',
  templateUrl: './add-medic.component.html',
  styleUrls: ['./add-medic.component.css']
})
export class AddMedicComponent implements OnInit{
  drug!:Medic;
  drugForm!:FormGroup;
  constructor (private Drug:MedicService, 
   private formBuilder : FormBuilder,
   private dialogRef : MatDialogRef<AddMedicComponent>){
   this.drugForm = this.formBuilder.group({
    drugName: ['', Validators['required']],
    dosage:[''],
    description:[''],
   effetSec:[''],
                  })};
   ngOnInit(): void{  }
   addDrug(): any {
    this.Drug.addDrug(this.drugForm.value)
    .subscribe({
      next: (response) => {
        if (response.success) {
          alert("Les informations sont enregistrées avec succès");
          this.dialogRef.close('save');
          this.drugForm.reset();
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