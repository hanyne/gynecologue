import { Component , OnInit } from '@angular/core';
import { Medic } from 'src/app/model/medic';
import { MedicService } from '../../../service/medic.service';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent implements OnInit  {
  Drug!: Medic[];
  filteredDrugs: Medic[] = [];
  selectedDrug!:any;
  constructor(private medicService: MedicService) { }
     // Retrieve the list of drugs from the MedicService and set the Drug property
  getAll(): void {
    this.medicService.getDrug().subscribe(
        (data) => {
          this.Drug = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  onFilter(selectedDrug: string): void {
    // Call the filterDrugs() method from the MedicService and set the filteredDrugs property
    this.filteredDrugs = this.medicService.filterDrugs(this.Drug, selectedDrug);
  }

  onSelect(drug: Medic): void {
    this.selectedDrug = drug.drugName;
    // Call the addDrugOrd() method from the MedicService to add the selected drug to the prescription
    this.medicService.addDrugOrd(drug).subscribe(
      (data) => {
        console.log('Drug added to prescription successfully');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.getAll();
  }
}
