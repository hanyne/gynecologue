import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ordonnance} from '../../../model/ordonance';
import { OrdonnanceService } from '../../../service/ordonance.service';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';


@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent implements OnInit  {
  patient: Patiente = new Patiente();
  Ord!: Ordonnance;
  submitted = false;
  ordForm!: FormGroup;
  constructor(public fb: FormBuilder,private ngZone: NgZone, private OrdonnanceService: OrdonnanceService ,private patienteService: PatienteService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
      this.mainForm(patientId!);
    });
  }
  mainForm(_id: string) {
    this.ordForm = this.fb.group({
      nom: this.patient.nomP,
      prenom: this.patient.prenomP,
      date: '',
     traitement: '',
    })}


  get myForm() {
    return this.ordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.ordForm.valid) {
      return false;
    } else {
      const patientId = this.route.snapshot.paramMap.get('id');
      return this.OrdonnanceService.createOrdonance(patientId!, this.ordForm.value).subscribe({
        complete: () => {
          console.log('ordonance successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/home'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
  }
  
