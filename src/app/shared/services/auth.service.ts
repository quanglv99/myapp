import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app.service';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private data: IUser[] = [];

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.loadData();
  }

  private loadData() {
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

  login(username: string, password: string): boolean {
    const isExistUser = this.data.find(
      (user) => user.username == username && user.password == password
    );
    if (isExistUser) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  isRememberedMe(): boolean {
    return localStorage.getItem('rememberUsername') !== null;
  }
}
