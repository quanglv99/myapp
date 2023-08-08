import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../share/users.service';
import { IUser } from '../share/user';
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
  user=
  {
    username:'',
    password:''       
  }
  constructor(private router:Router, private userService:UserService ) { }
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.inputUsername.nativeElement.focus();
    this.getUserFromApi();

  }
  
  getUserFromApi():void{
    this.userService.getUser()
    .subscribe((user) => {
      this.data = user;
    },
    (error)=>{
      console.log(error)
    })
  }

  onSubmit(){
    let isExistUser = this.data.find(m => m.username == this.user.username && this.user.password);
    console.log(this.data[0])
    if(isExistUser != undefined){
      this.router.navigate(['/home'])
    }else{
      alert("Login Failed: Username or password incorrect")
    }

  }
}
