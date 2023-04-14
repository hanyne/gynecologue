
import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import{AddMedicComponent} from '../add-medic/add-medic.component'
@Component({
  selector: 'app-list-medic',
  templateUrl: './list-medic.component.html',
  styleUrls: ['./list-medic.component.css']
})
export class ListMedicComponent {
  constructor(private dialog :MatDialog) {}
  openDialog() {
    this.dialog.open(AddMedicComponent, {
     width: '30%'

    });
  }
}
