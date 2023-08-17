import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfigService } from '../shared/services/app.service';
import { IUser } from '../shared/models/user.interface';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('inputUsername', { static: true })
  inputUsername!: ElementRef<HTMLInputElement>;
  hide: boolean = true;
  data: IUser[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {}
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false,
    });
    const rememberUsername = localStorage.getItem('rememberUsername');
    const rememberPassword = localStorage.getItem('rememberPassword');
    if (rememberPassword && rememberUsername) {
      this.loginForm.patchValue({
        username: rememberUsername,
        password: rememberPassword,
        rememberMe: true,
      });
    }
    if (!this.loginForm.value.rememberMe) {
      this.inputUsername.nativeElement.focus();
    }

    const apiUrl = this.appConfig.getUrl();
    this.http.get(apiUrl).subscribe(
      (userData: any) => {
        this.data = userData;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const rememberMe = this.loginForm.value.rememberMe;
      let isExistUser = this.data.find(
        (m) => m.username == username && m.password == password
      );
      if (isExistUser != undefined) {
        if (rememberMe) {
          localStorage.setItem('rememberUsername', username);
          localStorage.setItem('rememberPassword', password);
        } else {
          localStorage.removeItem('rememberUsername');
          localStorage.removeItem('rememberPassword');
        }
        this.router.navigate(['/home']);
      } else {
        alert('Login Failed: Username or password incorrect');
      }
    }
  }
}
