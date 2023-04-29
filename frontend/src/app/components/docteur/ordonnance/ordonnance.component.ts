import { Component , OnInit } from '@angular/core';
import { Ordonnance} from '../../../model/ordonance';
import { OrdonnanceService } from '../../../service/ordonance.service';
import { Medic} from 'src/app/model/medic';
import{MedicService} from '../../../service/medic.service';
@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent implements OnInit  {
  Ord!: Ordonnance;
  drug!:Medic[];
  selectedDrug!:any;
  searchTerm: string = '';
  msg: string ='';
  constructor(private OrdonnanceService: OrdonnanceService ,private Drug:MedicService ) { }

  onSelect(drug:Medic ): void {
    this.selectedDrug = drug.drugName;
  }
  onAjout(Ord:Ordonnance ): void {
    // Call the addDrugOrd() method from the OrdonnanceService to add the selected drug to the prescription
    this.OrdonnanceService.addOrd(Ord).subscribe(
      (data) => {
        console.log('Drug added to prescription successfully');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit() {}
  readmedic(searchTerm : string = '') {
    this.Drug.getDrug().subscribe((data) => {
      if (Object.keys(data).length === 0) {
        this.msg = 'No search result found';


      } else {
        this.drug= data;
      }
    });
  }
}