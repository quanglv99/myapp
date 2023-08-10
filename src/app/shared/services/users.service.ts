import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private appConfig: any;
  constructor(private http: HttpClient) {}

  //chuyen doi data
  loadConfig() {
    return this.http
      .get('/assets/config.json')
      .toPromise()
      .then((data) => {
        this.appConfig = data;
      });
  }

  getData(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.appConfig.API_URL);
  }
}
