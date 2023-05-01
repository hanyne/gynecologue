import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { CarnetCreateComponent } from './components/carnet-create/carnet-create.component';
import { CarnetListComponent } from './components/carnet-list/carnet-list.component';
import { CarnetEditComponent } from './components/carnet-edit/carnet-edit.component';
import { HomeComponent } from './components/home/home.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { CardcarnetComponent } from './components/cardcarnet/cardcarnet.component';
import { BlogComponent } from './components/blog/blog.component';
import { MessageGestionComponent } from './components/message-gestion/message-gestion.component';
import { LoginComponent } from './components/login/login.component';
import { AddMedicComponent } from './components/docteur/add-medic/add-medic.component';
import { AddPatComponent } from './components/docteur/add-pat/add-pat.component';
import { DashboardComponent } from './components/docteur/dashboard/dashboard.component';
import { ListMedicComponent } from './components/docteur/list-medic/list-medic.component';
import { ListPatientesComponent } from './components/docteur/list-patientes/list-patientes.component';
import { OrdonnanceComponent } from './components/docteur/ordonnance/ordonnance.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReclamationListComponent } from './components/reclamation-list/reclamation-list.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import {MatStepperModule} from '@angular/material/stepper';



const routes: Routes = [
  { path: '*', pathMatch: 'full', redirectTo: 'home' },
  { path: 'create-employee', component: EmployeeCreateComponent },
  { path: 'edit-employee/:id', component: EmployeeEditComponent },
  { path: 'employees-list', component: EmployeeListComponent }, 
  { path: 'create-carnet/:id', component: CarnetCreateComponent },
  { path: 'edit-carnet/:id', component: CarnetEditComponent },
  { path: 'carnet-list', component: CarnetListComponent }, 
  { path: 'home' , component: HomeComponent }, 
  { path: 'appointment' , component: AppointmentComponent  },
  { path: 'admin/listapp' , component: AppointmentListComponent  },  
  { path: 'contact' , component: ContactComponent  }, 
  { path: 'about' , component: AboutComponent  }, 
  { path: 'service' , component: ServiceComponent  }, 
  { path: 'categorie' , component: CategorieComponent  }, 
  { path: 'card' , component: CardcarnetComponent  },
  { path: 'blog' , component: BlogComponent  },
  { path: 'msg' , component: MessageGestionComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/listP', component: ListPatientesComponent },
  { path: 'admin/ord', component: OrdonnanceComponent},
  {path: 'admin/patiente', component:AddPatComponent},
  {path:'admin/addmedic', component:AddMedicComponent },
  {path:'admin/listM', component:ListMedicComponent },
  {path:'admin/listR', component:ReclamationListComponent  },
  {path:'const/:id', component:ConsultationComponent  },
  //psw
  {path:'request', component:RequestResetComponent },
  {path:'response/:resettoken', component:ResponseResetComponent},
  {path:'changepass/:id', component: ChangePassComponent },
  {path:'carnet/:id', component:ConsultationComponent },

  
  


    
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }