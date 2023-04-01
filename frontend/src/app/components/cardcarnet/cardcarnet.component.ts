import { Component, OnInit } from '@angular/core';
import { carnetService } from './../../service/carnet.service';
import {  FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-cardcarnet',
  templateUrl: './cardcarnet.component.html',
  styleUrls: ['./cardcarnet.component.css']
})
export class CardcarnetComponent {
  Carnet:any = [];
  searchTerm: string = '';
  //checkbox
maladie = this.fb.group({
  Diabéte: false,
  Cardiopathie: false,
  Insuffisance_rénale_chronique: false,
  Asthme: false,
  Anémie:false,
  Hépatite_C:false,
  Hépatite_B: false,
});
  constructor(public fb: FormBuilder,private CarnetService: carnetService) { 
    this.readCarnet();
  }
 
  ngOnInit() {}
  readCarnet(searchTerm: string = '') {
    this.CarnetService.getCarnets(searchTerm).subscribe((data) => {
      this.Carnet = data;
    });
  }

  
}