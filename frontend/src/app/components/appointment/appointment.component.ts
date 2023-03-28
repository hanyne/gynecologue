import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  newAppointment: any = {};
  errorMessages: string[] = [];
 

  constructor( private appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  addAppointment() {
    this.errorMessages = [];

    if (!this.newAppointment?.nom || !this.newAppointment?.email || !this.newAppointment?.numt || !this.newAppointment?.date || !this.newAppointment?.motif) {
      this.errorMessages.push('Veuillez entrer tous les détails du rendez-vous');
      return;
    }

    const appointment = {
      nom: this.newAppointment.nom,
      email: this.newAppointment.email,
      numt: this.newAppointment.numt,
      date: this.newAppointment.date,
      motif: this.newAppointment.motif,
    };

    this.appointmentService.addAppointment(appointment).subscribe(
      (response) => {
        console.log(response);
        // Clear the form after adding appointment successfully
        this.newAppointment = {
          nom: '',
          email: '',
          numt: '',
          date: '',
          motif:'',
        };
      },
      (error) => {
        console.error(error);
        this.errorMessages.push('Failed to add appointment');
      }
    );
  }

}
