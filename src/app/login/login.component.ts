import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
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
    private authService: AuthService,
    private dialog:MatDialog
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

  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const rememberMe = this.loginForm.value.rememberMe;
      if (this.authService.login(username, password)) 
      {
        if (rememberMe) {
          localStorage.setItem('rememberUsername', username);
          localStorage.setItem('rememberPassword', password);
        } else {
          localStorage.removeItem('rememberUsername');
          localStorage.removeItem('rememberPassword');
        }
        this.router.navigate(['/home']);
      }else
      {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '300px',
          data: { message: 'invalid username or password!',
                  showYesNo: false }
        });
      }
    }
  }
}
