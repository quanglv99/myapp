import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/shared/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private appConfig: AppConfigService, private http:HttpClient) { }
  
  fetchData(token: string, module_id: string):Observable<any>{
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
}
