import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import userData from 'src/assets/users.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('inputUsername', { static: true })
  inputUsername!: ElementRef<HTMLInputElement>;
  hide = true;
  user=
  {
    username:'',
    password:''       
  }
  constructor(private router:Router) { }
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.inputUsername.nativeElement.focus();
  }
  
  visible:boolean = true;
  viewPassword(){
    this.visible = !this.visible
  }
  onSubmit(){
    let isExistUser = userData.users.find(m => m.username == this.user.username && this.user.password);
    if(isExistUser != undefined){
      this.router.navigate(['/home'])
    }else{
      alert("Login Failed: Username or password incorrect")
    }

  }
}
