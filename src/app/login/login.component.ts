import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../share/users.service';
import { IUser } from '../share/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('inputUsername', { static: true })
  inputUsername!: ElementRef<HTMLInputElement>;
  hide = true;
  data: IUser[] = [];
  constructor(private router:Router, private userService:UserService, private formBuilder:FormBuilder,private http:HttpClient) { }
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.inputUsername.nativeElement.focus();
    this.getUserFromApi();
    this.loginForm= this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false,
    })
    

  }

  getUserFromApi(): void {
    this.userService.loadConfig().then(() => {
      this.userService.getData().subscribe(
        (user) => {
          this.data = user;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(){

    if(this.loginForm.valid){
    const formData = this.loginForm.value;
    let isExistUser = this.data.find(m => m.username == formData.username && m.password == formData.password);
    console.log(this.data[0]);
    if(isExistUser != undefined){
      this.router.navigate(['/home'])
    }else{
      alert("Login Failed: Username or password incorrect")
    }
    }
    
  }
}
