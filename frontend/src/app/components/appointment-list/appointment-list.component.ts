import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Appointment } from '../../model/appointment';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
  appointmentsList: Appointment[] = [];
  newAppointment: Appointment = new Appointment();
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      appointments => {
        this.appointmentsList = appointments;
      },
      error => {
        console.error('Failed to get appointments', error);
      }
    );
  }

  deleteAppointment(appointment: Appointment): void {
    this.appointmentService.deleteAppointment(appointment).subscribe(
      () => {
        this.appointmentsList = this.appointmentsList.filter(a => a !== appointment);
      },
      error => {
        console.error('Failed to delete appointment', error);
      }
    );
  }

}