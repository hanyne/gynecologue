import { Carnet } from './../../model/carnet';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { carnetService } from '../../service/carnet.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-carnet-edit',
  templateUrl: './carnet-edit.component.html',
  styleUrls: ['./carnet-edit.component.css'],
})
export class CarnetEditComponent implements OnInit {
  submitted = false;
  editForm!:FormGroup;

    //radiobox
couvertureList= ["Oui","Non"];
sangList=["A","B","AB","O"];
rhesusList=["Positive","Negative"];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private CarnetService : carnetService ,
    private router: Router
  ) {}
  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getCarnet(id);
    this.editForm = this.fb.group({

    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
    naissance: ['', [Validators.required]],
    nationalite: ['', [Validators.required]],
    Cin: ['', [Validators.required]],
    niv_inst: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    couv: ['', [Validators.required]],
    num_c: ['', [Validators.required]],
    sang: ['', [Validators.required]],
    rhesus: ['', [Validators.required]],
    type_allergie: ['', [Validators.required]],
    declaree_allergie: ['', [Validators.required]],
    traitement: ['', [Validators.required]],
    med_tret: ['', [Validators.required]],
    age_pub: ['', [Validators.required]],
    prob: ['', [Validators.required]],
    maladie: ['', [Validators.required]],
   maladieF: ['', [Validators.required]],
    type_handicap: ['', [Validators.required]],
    declaree_handicap: ['', [Validators.required]],
    date_vaccin1: ['', [Validators.required]],
    lieu_vaccin1: ['', [Validators.required]],
    date_vaccin2: ['', [Validators.required]],
    lieu_vaccin2: ['', [Validators.required]],
    date_vaccin3: ['', [Validators.required]],
    lieu_vaccin3: ['', [Validators.required]],
    date_vaccin4: ['', [Validators.required]],
    lieu_vaccin4: ['', [Validators.required]],
    date_vaccin5: ['', [Validators.required]],
    lieu_vaccin5: ['', [Validators.required]],
    date_rubeole: ['', [Validators.required]],
    lieu_rubeole: ['', [Validators.required]],
    autre_vaccin: ['', [Validators.required]],
    nomM: ['', [Validators.required]],
    prenomM: ['', [Validators.required]],
    telM: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getCarnet(id: string | null) {
    this.CarnetService .getCarnet(id).subscribe((data) => {
      this.editForm.setValue({

       nom :data['nom'],

        prenom:data['prenom'],
     
        adresse:data['adresse'],
     
        naissance:data['naissance'],
     
        nationalite:data['nationalite'],
     
        Cin:data['Cin'],
     
        niv_inst:data['niv_inst'],
     
        occupation:data['occupation'],
     
        tel:data['tel'],
     
        couv:data['couv'],
     
        num_c:data['num_c'],
     
        sang:data['sang'],
     
        rhesus:data['rhesus'],
     
        type_allergie:data['type_allergie'],
     
        declaree_allergie:data['declaree_allergie'],
     
        traitement:data['traitement'],
     
        med_tret:data['med_tret'],
     
        age_pub:data['age_pub'],
     
        prob:data['prob'],
     
        maladie:data['maladie'],
     
        maladieF:data['maladieF'],
     
        type_handicap:data['type_handicap'],
     
        declaree_handicap:data['declaree_handicap'],
     
        date_vaccin1:data['date_vaccin1'],
     
        lieu_vaccin1:data['lieu_vaccin1'],
     
        date_vaccin2:data['date_vaccin2'],
     
        lieu_vaccin2:data['lieu_vaccin2'],
     
        date_vaccin3:data['date_vaccin3'],
        lieu_vaccin3:data['lieu_vaccin3'],
     
        date_vaccin4:data['date_vaccin4'],
     
        lieu_vaccin4:data['lieu_vaccin4'],
     
        date_vaccin5:data['date_vaccin5'],
     
        lieu_vaccin5:data['lieu_vaccin5'],
     
        date_rubeole:data['date_rubeole'],
     
        lieu_rubeole:data['lieu_rubeole'],
     
        autre_vaccin:data['autre_vaccin'],
     
        nomM:data['nomM'],
     
        prenomM:data['prenomM'],
     
        telM:data['telM'],
    
      });
    });
  }
  updateCarnet() {
    this.editForm = this.fb.group({

      nom: ['', [Validators.required]],
      prenom: '',
 
      adresse: '',
   
      naissance: '',
   
      nationalite: '',
   
      Cin: '',
   
      niv_inst: '',
   
      occupation: '',
   
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
   
      couv: '',
   
      num_c: '',
   
      sang: '',
   
      rhesus: '',
   
      type_allergie: '',
   
      declaree_allergie: '',
   
      traitement: '',
   
      med_tret: '',
   
      age_pub: '',
   
      prob: '',
   
      maladie: '',
   
      maladieF: '',
   
      type_handicap: '',
   
      declaree_handicap: '',
   
      date_vaccin1: '',
   
      lieu_vaccin1: '',
   
      date_vaccin2: '',
   
      lieu_vaccin2: '',
   
      date_vaccin3: '',
      lieu_vaccin3: '',
   
      date_vaccin4: '',
   
      lieu_vaccin4: '',
   
      date_vaccin5: '',
   
      lieu_vaccin5: '',
   
      date_rubeole: '',
   
      lieu_rubeole: '',
   
      autre_vaccin: '',
   
      nomM: '',
   
      prenomM: '',
   
      telM: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  
     
      
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.CarnetService .updateCarnet(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/carnet-list');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
    return true;
  }
  
  
}







