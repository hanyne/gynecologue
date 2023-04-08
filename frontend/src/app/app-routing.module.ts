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




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'create-employee', component: EmployeeCreateComponent },
  { path: 'edit-employee/:id', component: EmployeeEditComponent },
  { path: 'employees-list', component: EmployeeListComponent }, 
  { path: 'create-carnet', component: CarnetCreateComponent },
  { path: 'edit-carnet/:id', component: CarnetEditComponent },
  { path: 'carnet-list', component: CarnetListComponent }, 
  { path: 'home' , component: HomeComponent }, 
  { path: 'appointment' , component: AppointmentComponent  }, 
  { path: 'contact' , component: ContactComponent  }, 
  { path: 'about' , component: AboutComponent  }, 
  { path: 'service' , component: ServiceComponent  }, 
  { path: 'categorie' , component: CategorieComponent  }, 
  { path: 'card' , component: CardcarnetComponent  },
  { path: 'blog' , component: BlogComponent  },
  { path: 'msg' , component: MessageGestionComponent }, 

  


    
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }