import { Router } from '@angular/router';
import { carnetService } from '../../service/carnet.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-carnet-create',
  templateUrl: './carnet-create.component.html',
  styleUrls: ['./carnet-create.component.css']

})


export class CarnetCreateComponent implements OnInit {
  submitted = false;
  carnetForm!: FormGroup;
  photo: any = null; 
  //radiobox
couvertureList= ["Oui","Non"];
sangList=["A","B","AB","O"];
rhesusList=["Positive","Negative"];
//checkbox

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private carnetService: carnetService
  ) {
    this.mainForm();
  }
  ngOnInit() {}
  mainForm( 
    
  ) {
    this.carnetForm = this.fb.group({

       

        nom: '', 

        prenom: '', 
     
        adresse: '', 
     
        naissance: '', 
     
        nationalite: '', 
     
        Cin: '', 
     
        niv_inst: '', 
     
        occupation: '', 
     
        tel: '', 
     
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
     
        telM: '', 
     
    });
  }
  loadImage(photo: any) {
    if (photo.target.files && photo.target.files[0]) {
      this.photo = photo.target.files[0];
      console.log(this.photo);
    } else {
      // Set a default picture if no photo was selected
      this.photo = 'src/assets/image/default.jpg';
    }
  }
  
  
// Choose designation with select dropdown

  // Getter to access form control
  get myForm() {
    return this.carnetForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.carnetForm.valid) {
      return false;
    } else {
      return this.carnetService.createCarnet(this.carnetForm.value).subscribe({
        complete: () => {
          console.log('carnet successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/carnet-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}