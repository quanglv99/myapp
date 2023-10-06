import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../data/models/user.interface';
import { AuthService } from '../../core/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('inputUsername', { static: true })
  inputUsername!: ElementRef<HTMLInputElement>;
  hide: boolean = true;
  data: IUser[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.loginForm.reset();
  }
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',],
      password: [''],
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
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
      const remember = this.loginForm.get('rememberMe')!.value;
      this.authService.login(username, password,remember).subscribe(
        (response) => {
          if (response.status === 1) {
            localStorage.setItem('currentToken', response.token);
            this.router.navigate(['/home']);
          } else {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              width: '300px',
              data: {
                message: 'invalid username or password!',
                showYesNo: false,
              },
            });
          }
        },
        (error) => {
          console.error('Login error', error);
        }
      );
    }
  }
}
