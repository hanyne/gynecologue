import { Component, OnInit } from '@angular/core';
import { carnetService } from './../../service/carnet.service';
import {  FormBuilder} from '@angular/forms';
import { Carnet } from 'src/app/model/carnet';

@Component({
  selector: 'app-carnet-list',
  templateUrl: './carnet-list.component.html',
  styleUrls: ['./carnet-list.component.css']
})
export class CarnetListComponent implements OnInit {
  
  carnets!:Carnet;
  Carnet:any = [];

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
  readCarnet(){
    this.CarnetService.getCarnets().subscribe((data) => {
     this.Carnet = data;

    })    
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