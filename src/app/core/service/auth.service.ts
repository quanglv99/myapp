import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../../shared/services/app.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token = '';

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private dialog: MatDialog
  ) {
    const token = localStorage.getItem('currentToken');
    this.isAuthenticated = !!token;
  }

  login(
    username: string,
    password: string,
    rememberMe: boolean
  ): Observable<any> {
    const url = this.appConfig.getLoginApi();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      username: username,
      password: password,
    };

    // Make the HTTP POST request
    return this.http.post(url, JSON.stringify(body), { headers: headers }).pipe(
      // Handle the response
      tap(
        (response: any) => {
          if (response.status === 1) {
            this.setAuthenticated(true);
            this.token = response.token;
            if (rememberMe) {
              localStorage.setItem('rememberUsername', username);
              localStorage.setItem('rememberPassword', password);
            } else {
              localStorage.removeItem('rememberUsername');
              localStorage.removeItem('rememberPassword');
            }
          }
        },
        (error) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '300px',
            data: { message: 'Server unreachable!', showYesNo: false },
          });
        }
      )
    );
  }

  getDevice(token: string, module_id: string): Observable<any> {
    const url = this.appConfig.getDeviceApi();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      token: token,
      module_id: module_id,
    };
    return this.http.post(url, JSON.stringify(body), { headers: headers });
  }

  logout() {
    localStorage.removeItem('currentToken')
    this.setAuthenticated(false); 
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }
  isRememberedMe(): boolean {
    return localStorage.getItem('rememberUsername') !== null;
  }

  getToken(): string {
    return this.token;
  }
}
