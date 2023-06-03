import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { ConsultationService } from 'src/app/service/consultation.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  patient: Patiente = new Patiente();
  submitted = false;
  consultationForm!: FormGroup;
photo : any;

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationService,
    private patienteService: PatienteService,
    private route: ActivatedRoute,
    private UserService:UserService
  ) {}

  ngOnInit(): void {
    if (!this.UserService.isDocteurOrSecretaire()) {
      this.UserService.logout(); // Redirect to login page
    } else {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
      this.createForm(patientId!);
    });
  }
}

  createForm(_id: string) {
    this.consultationForm = this.fb.group({
      conclusion: '',
      annexe: '',
      timing: '',
    });
  }

  loadImage(photo: any) {
    if (photo.target.files && photo.target.files[0]) {
      this.photo = photo.target.files[0];
      console.log(this.photo);
  
      // Set the annexe value in the form to the selected photo
      this.consultationForm.patchValue({
        annexe: this.photo
      });
    } else {
      // Set a default picture if no photo was selected
      this.photo = 'src/assets/image/default.jpg';
    }
  }
  

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
          console.log('Consultation successfully created!');
          // Perform the desired action after consultation creation
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  logOut() {
    if (confirm("Do you want to log out?")) {
      // Perform the log out action
    }
  }
}
