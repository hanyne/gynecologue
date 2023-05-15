import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SmsService } from '../../../service/sms.service';
import { AppointmentService } from '../../../service/appointment.service';
import { Appointment} from '../../../model/appointment';
@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
  appointment: Appointment = new Appointment();
  submitted = false;
  SmsForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private smsService: SmsService,
    private AppointmentService: AppointmentService
  ) {}

  ngOnInit() {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    this.AppointmentService.getById(appointmentId!).subscribe((appointment) => {
      this.appointment = appointment;
      this.createForm();
    });
  }

  createForm() {
    this.SmsForm = this.fb.group({
      nom: [this.appointment.nom],
      prenom: [this.appointment.prenom],
      numt: [this.appointment.numt],
      messageBody: ['', Validators.required]
    });
  }

  get f() {
    return this.SmsForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.SmsForm.invalid) {
      return;
    }

    const appointmentId = this.route.snapshot.paramMap.get('id');
    const data = this.SmsForm.value

    this.smsService.Send(appointmentId!,data).subscribe(
      () => {
        console.log('SMS sent successfully.');
      },
      (error) => {
        console.error('Failed to send SMS:', error);
      }
    );
  }
}
