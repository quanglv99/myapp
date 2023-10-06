import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig: any;
  constructor(private http: HttpClient) {}

  loadConfig(){
    return this.http
          .get('assets/appconfig.json')
          .toPromise()
          .then((data) => {
            this.appConfig = data;
          })
  }

  getLoginApi():string{
    return this.appConfig.LOGIN
  }

  getDeviceApi():string{
    return this.appConfig.LIST_DEVICE
  }

  getHomeUrl():string{
    return this.appConfig.HOME_URL
  }
  getDashboardUrl():string{
    return this.appConfig.DASHBOARD_URL
  }

}

