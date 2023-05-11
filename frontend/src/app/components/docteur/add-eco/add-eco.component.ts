import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Echographie } from '../../../model/echographie';
import { EchographieService} from '../../../service/echographie.service';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
//cornerstone
import * as cornerstone from 'cornerstone-core';
import * as dicomParser from 'dicom-parser';

@Component({
  selector: 'app-add-eco',
  templateUrl: './add-eco.component.html',
  styleUrls: ['./add-eco.component.css']
})
export class AddEcoComponent implements OnInit {
  dicom: File | undefined = undefined;
  eco!: Echographie[];
  echo:any =[]; 
  ecoForm!: FormGroup;
  selectedEco: Echographie| undefined = undefined;
  isEditMode: boolean = false;
  patient: Patiente = new Patiente();
  constructor(private ecoService: EchographieService,   
    private patienteService: PatienteService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
      this.mainForm(patientId!);

    this.getAllEco();
  
    });
  }  
  mainForm(_id: string) {
  this.ecoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      dicom: new FormControl('')
    });}
getAllEco() {
    this.ecoService.getAllEco().subscribe(
      (res: Echographie[]) => {
        this.eco = res;
      },
      (err) => console.error(err)
    );
  }
  
loadDicomImage(): void {
  // Charge l'image DICOM
const xhr = new XMLHttpRequest();
const imageId =  `http://localhost:4000/${this.echo.dicom}`
xhr.open('get', imageId , true);
xhr.responseType = 'arraybuffer';

xhr.onload = () => {
  const byteArray = new Uint8Array(xhr.response);
  dicomParser.parseDicom(byteArray);
  const canvas = document.getElementById('dicomCanvas') as HTMLCanvasElement;
  cornerstone.loadAndCacheImage(imageId).then((image) => {
    cornerstone.displayImage(canvas, image);
  });
}
xhr.send();
}
onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.dicom = input.files[0];
    }
  }

onSubmit() {
    const eco = this.ecoForm.value;
    if (this.isEditMode && this.selectedEco && this.selectedEco._id && this.dicom) {
      this.ecoService.updateEco(this.selectedEco._id, eco, this.dicom).subscribe(
        (res: Echographie) => {
          const index = this.eco.findIndex(a => a._id === res._id);
          this.eco[index] = res;
          this.ecoForm.reset();
          this.dicom= undefined;
          this.selectedEco = undefined;
          this.isEditMode = false;
        },
        (err) => console.error(err)
      );
    } else {
      const patientId = this.route.snapshot.paramMap.get('id');
      if (this.dicom) {
        this.ecoService.createEco(eco, patientId!, this.dicom).subscribe(
          (res: Echographie) => {
            this.eco.unshift(res);
            this.ecoForm.reset();
            this.dicom = undefined;
          },
          (err) => console.error(err)
        );
      }
    }
  }
  

  onEdit(eco: Echographie) {
    this.ecoForm.patchValue({
      title: eco.title,
      description: eco.description,
      content: eco.content
    });
    this.selectedEco = eco;
    this.isEditMode = true;
  }
  
  onCancel() {
    this.ecoForm.reset();
    this.dicom = undefined;
    this.selectedEco = undefined;
    this.isEditMode = false;
  }


  onDelete(eco: Echographie) {
    if (eco && eco._id && confirm(`Are you sure you want to delete the eco "${eco.title}"?`)) {
      this.ecoService.deleteEco(eco._id).subscribe(
        () => {
          const index = this.eco.findIndex(a => a._id === eco._id);
          this.eco.splice(index, 1);
        },
        (err) => console.error(err)
      );
    }
  }
  
}

