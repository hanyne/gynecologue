import { Carnet } from './../../model/carnet';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { carnetService } from '../../service/carnet.service';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent {
 carnet: Carnet = new Carnet();

  constructor(private route: ActivatedRoute, private CarnetService: carnetService) { }

  ngOnInit() {
    this.getCarnet();
  }

  getCarnet() {
    const id = this.route.snapshot.paramMap.get('id');
    this.CarnetService.getCarnet(id).subscribe(
      (res) => {
        this.carnet = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }


}
