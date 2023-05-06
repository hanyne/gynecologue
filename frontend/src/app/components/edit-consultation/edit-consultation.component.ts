import { Carnet } from './../../model/carnet';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../../service/consultation.service';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-consultation',
  templateUrl: './edit-consultation.component.html',
  styleUrls: ['./edit-consultation.component.css']
})
export class EditConsultationComponent {
  submitted = false;
  editForm!:FormGroup;

  route: any;
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private consultationService : ConsultationService ,
    private userService : UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getConsultation(id);
    this.editForm = this.fb.group({
      
    timing: [''],
    conclusion: [''],
    annexe: [''],

   
    });
    }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getConsultation(id: string | null) {
    this.consultationService .getConsultation(id).subscribe((data) => {
      this.editForm.setValue({

       timing :data['timing'],

        conclusion:data['conclusion'],
     
        annexe:data['annexe'],
     
      
      });
    });
  }
  updateConsultation() {
    this.editForm = this.fb.group({
   

      timing: '',
      conclusion: '',
 
      annexe: '',
   
     
     
  
     
      
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.consultationService .updateConsultation(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/admin/listP');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
    return true;
  }
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.userService.logoutUser()
    }
  }
}




