import { Component, OnInit } from '@angular/core';
import { ConsultationService } from './../../service/consultation.service';
import {  FormBuilder} from '@angular/forms';
import { Consultation } from 'src/app/model/consultation';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.css']
})
export class ConsultationListComponent implements OnInit {
  
  consultations!:Consultation;
  Consultation:any = [];
  patient: Patiente = new Patiente();

  constructor(public fb: FormBuilder,private ConsultationService: ConsultationService,private patienteService: PatienteService,private route: ActivatedRoute) { 
   
  }
  
 
  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
      this.readConsultation(patientId!);
    });
  }

  readConsultation(patientId: string) {
    this.ConsultationService.getConsultations(patientId).subscribe((data) => {
      this.Consultation = data;
    });
  }

  onDelete(consultation: Consultation) {
    if (consultation && consultation._id && confirm(`Souhaitez-vous confirmer la suppression de carnet de"${consultation.timing}"?`)) {
      this.ConsultationService.deleteConsultation(consultation._id).subscribe(
        () => {
          const index = this.consultations.findIndex((a: { _id: string | undefined; }) => a._id === consultation._id);
          this.consultations.splice(index, 1);
        },
        (err) => console.error(err)
      );
    }
  }
  
}