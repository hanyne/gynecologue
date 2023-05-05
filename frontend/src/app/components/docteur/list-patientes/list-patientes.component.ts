import { Component, OnInit } from '@angular/core';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { carnetService } from '../../../service/carnet.service';
import { ConsultationService } from '../../../service/consultation.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-patientes',
  templateUrl: './list-patientes.component.html',
  styleUrls: ['./list-patientes.component.css']
})
export class ListPatientesComponent implements OnInit {
  textsearch:any;
  patientes: Patiente[]=[];
  dataSource = new MatTableDataSource<Patiente>(this.patientes);
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(
    private patienteService: PatienteService,
    private carnetService: carnetService,
    private consultationService: ConsultationService,
    private router: Router
  ) { }
  

  createCarnet(patientId: any) {
    this.router.navigate(['/create-carnet', patientId]);
  }
  createConsultation(patientId: any) {
    this.router.navigate(['/const', patientId]);
  }
  createOrdonance(patientId: any) {
    this.router.navigate(['/ord', patientId]);
  }
  listCarnet(patientId: any) {
    this.router.navigate(['/patient', patientId]);
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(searchTerm: string = ''){
    this.patienteService.getP(searchTerm).subscribe((data) =>
    {
      this.patientes = data
      console.log(data);
    } )
  }

  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.patienteService.logoutUser()
    }
  }

  deletepatiente(patienteClicked: Patiente) {
    if(window.confirm('Do you want to go ahead?')) {
      this.patienteService.deleteP(patienteClicked._id)
        .subscribe(() => {
          this.patientes = this.patientes.filter(tL => tL._id != patienteClicked._id);
        });
    }
  }

 
  }
