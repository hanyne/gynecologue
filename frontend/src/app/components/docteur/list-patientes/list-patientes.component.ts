import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import { carnetService } from 'src/app/service/carnet.service';
import { Carnet} from 'src/app/model/carnet';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {  FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-list-patientes',
  templateUrl: './list-patientes.component.html',
  styleUrls: ['./list-patientes.component.css']
})
export class ListPatientesComponent implements OnInit {
  Carnet:any = [];
  searchTerm: string = '';
  carnets!:Carnet;
  constructor(public fb: FormBuilder,private CarnetService: carnetService) { 
    this.readCarnet();
  }
  ngOnInit() {}
  readCarnet(searchTerm: string = '') {
    this.CarnetService.getCarnets(searchTerm).subscribe((data) => {
      if (Object.keys(data).length === 0) {
        this.Carnet = 'No search result found';
      } else {
        this.Carnet = data;
      }
    });
  }
  onDelete(carnet: Carnet) {
    if (carnet && carnet._id && confirm(`Souhaitez-vous confirmer la suppression de carnet de"${carnet.nom}"?`)) {
      this.CarnetService.deleteCarnet(carnet._id).subscribe(
        () => {
          const index = this.carnets.findIndex((a: { _id: string | undefined; }) => a._id === carnet._id);
          this.carnets.splice(index, 1);
        },
        (err) => console.error(err)
      );
    }
  }
  
}



