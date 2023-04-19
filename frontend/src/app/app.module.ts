import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CarnetCreateComponent } from './components/carnet-create/carnet-create.component';
import { CarnetListComponent } from './components/carnet-list/carnet-list.component';
import { CarnetEditComponent } from './components/carnet-edit/carnet-edit.component';
import { HomeComponent } from './components//home/home.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ListappoComponent } from './components/listappo/listappo.component';
import { BlogComponent } from './components/blog/blog.component';
import { MessageGestionComponent } from './components/message-gestion/message-gestion.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
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
//angular material 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { CategorieComponent } from './components/categorie/categorie.component';
import { CardcarnetComponent } from './components/cardcarnet/cardcarnet.component';
import {MatCardModule} from '@angular/material/card';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReclamationListComponent } from './components/reclamation-list/reclamation-list.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { ConsultationComponent } from './components/consultation/consultation.component';


@NgModule({

  declarations: [
    
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    CarnetCreateComponent,
    CarnetListComponent,
    CarnetEditComponent,
    HomeComponent,
    AppointmentComponent,
    ListappoComponent,
    ContactComponent,
    AboutComponent,
    ServiceComponent,
    NavbarComponent,
    FooterComponent,
    CategorieComponent,
    CardcarnetComponent,
    BlogComponent,
    MessageGestionComponent,
    PagenotfoundComponent,
    LoginComponent,
    AddMedicComponent,
    AddPatComponent,
    DashboardComponent,
    ListMedicComponent,
    ListPatientesComponent,
    OrdonnanceComponent,
    ChangePassComponent,
    RequestResetComponent,
    ResponseResetComponent,
    AppointmentListComponent,
    ReclamationListComponent,
    HistoriqueComponent,
    ConsultationComponent,

 

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatProgressBarModule,
    MatPaginatorModule,
    



  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
