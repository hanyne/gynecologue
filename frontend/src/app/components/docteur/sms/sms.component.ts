import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import{Sms} from '../../../model/sms'
import {SmsService } from '../../../service/sms.service';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
  patient: Patiente = new Patiente();
  sms!: Sms;
  submitted = false;
  SmsForm!: FormGroup;
  constructor(public fb: FormBuilder,private SMSService: SmsService ,private patienteService: PatienteService,private route: ActivatedRoute) { }

  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
      this.mainForm(patientId!);
    });
  }
  mainForm(_id: string) {
    this.SmsForm = this.fb.group({
      nom: this.patient.nomP,
      prenom: this.patient.prenomP,
      naissance:this.patient.naissance,
      messageBody : '',
    })}


  get myForm() {
    return this.SmsForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.SmsForm.valid) {
      return false;
    } else {
      const patientId = this.route.snapshot.paramMap.get('id');
      return this.SMSService.Send(patientId!, this.SmsForm.value).subscribe({
        complete: () => {
          console.log('ordonance successfully created!');
        },
      });
    }
  }
  }
  

