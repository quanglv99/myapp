import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig: any;
  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http
      .get('/assets/config.json')
      .toPromise()
      .then((data) => {
        this.appConfig = data;
      });
  }
  getUrl():string{
    return this.appConfig.API_URL
  }
  getHomeUrl():string{
    return this.appConfig.HOME_URL
  }

}

