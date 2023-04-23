import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Patiente } from 'src/app/model/patiente';
import { Secretaire } from 'src/app/model/secretaire';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user!: User;
  secretaire!: Secretaire;
  patiente!:Patiente;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  constructor(public formBuilder: FormBuilder, private userService: UserService, 
    private router: Router) {
    this.loginForm= this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
      })
   }


   get f() { return this.loginForm.controls; }  
   ngOnInit(): void {
     
   }
   onSubmit() {
     this.submitted = true;
     if (this.loginForm.invalid) {
         return;
     }
     this.loading = true;
     this.userService.login(this.loginForm.value)        
     .subscribe(data => {
      localStorage.setItem('token', data.token);
      if (data.user === null) {
        alert('Username or password is wrong');
      } else {
        localStorage.setItem('userName', data.user?.userName);
        console.log('Login successful');
        console.log('Data.user.role', data.user.role);
        if (data.user.role === 'docteur') {
          this.router.navigate(['admin/dashboard']);
        } else if (data.user.role === 'patiente') {
          this.router.navigate(['/home']);
        } else if (data.user.role === 'secretaire') {
          this.router.navigate(['admin/dashboard']);
        } else {
          console.log('Unknown role:', data);
          alert('Unknown user role');
        }
      }
    }, err => {
      alert("Login failed");        
    });
   }}
