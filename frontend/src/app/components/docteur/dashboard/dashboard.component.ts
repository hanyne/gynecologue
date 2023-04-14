import { Component, OnInit } from '@angular/core';
import { SecretaireService } from 'src/app/service/secretaire.service';
import { PatienteService } from 'src/app/service/patiente.service';
import { UserService } from 'src/app/service/user.service';
import { Patiente } from 'src/app/model/patiente';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nbrP : any;
  patientes: Patiente[]=[];
  constructor(private SecretaireService:SecretaireService,
    private PatienteService:PatienteService,
    private UserService:UserService  ){}
    user!:any;
    ngOnInit(): void {
      this.getNbP()
      document.querySelector("#content > div.topbar");
      this.user = this.UserService.getCurrentUser().user;
      }
    
      getNbP(){
        this.PatienteService.getNbP().subscribe((data)=>
        {this.nbrP =data, console.log("Nombre de patiente "+this.nbrP)});
      }
  
     
    
      async logOut() {
        if (confirm("Do you want to log out?")) {
          await this.UserService.logoutUser()
        }
      }
}

