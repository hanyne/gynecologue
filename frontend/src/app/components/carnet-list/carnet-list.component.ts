import { Component, OnInit } from '@angular/core';
import { carnetService } from './../../service/carnet.service';
import {  FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-carnet-list',
  templateUrl: './carnet-list.component.html',
  styleUrls: ['./carnet-list.component.css']
})
export class CarnetListComponent implements OnInit {
  
  
  Carnet:any = [];
  photo: any = null;
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
  loadImage(photo: any) {
    this.photo = photo.target.files[0];
    console.log(this.photo);
  } 
  ngOnInit() {}
  readCarnet(){
    this.CarnetService.getCarnets().subscribe((data) => {
     this.Carnet = data;
    })    
  }
  removeCarnet(carnet: any, index: number) {
    if(window.confirm('Are you sure?')) {
        this.CarnetService.deleteCarnet(carnet._id).subscribe((data) => {
          this.Carnet.splice(index, 1);
        }
      )    
    }
  }
}