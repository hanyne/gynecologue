import { Component, OnInit } from '@angular/core';
import { Ordonnance } from '../../model/ordonance';
import { OrdonnanceService } from '../../service/ordonance.service';

@Component({
  selector: 'app-ordonnace-list',
  templateUrl: './ordonnace-list.component.html',
  styleUrls: ['./ordonnace-list.component.css']
})
export class OrdonnanceListComponent implements OnInit {
  ordonnances: Ordonnance[] = [];

  constructor(private ordonnanceService: OrdonnanceService) { }

  ngOnInit() {
   
  }

}