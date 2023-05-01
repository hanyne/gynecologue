import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators , } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { ConsultationService } from 'src/app/service/consultation.service';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent  implements OnInit  {
  patient: Patiente = new Patiente();
  submitted = false;
  consultationForm!: FormGroup;
  photo: any = null;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private consultationService: ConsultationService,
    private patienteService: PatienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
      this.mainForm(patientId!);
    });
  }


  mainForm(_id: string) {
  this.consultationForm = this.fb.group({
  consultdate: '',
  conclusion: '',
  annexe:'',
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
    return this.consultationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.consultationForm.valid) {
      return false;
    } else {
      const patientId = this.route.snapshot.paramMap.get('id');
      return this.consultationService.createConsultation(patientId!, this.consultationForm.value).subscribe({
        complete: () => {
          console.log('consultation successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/home'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}

