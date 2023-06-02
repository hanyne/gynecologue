import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private UserService:UserService ,){}


    
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.UserService.logoutUser()
    }
  }
}
