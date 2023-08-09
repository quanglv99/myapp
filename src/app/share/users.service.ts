import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import apiUrl from 'src/assets/userlist.json'
import { IUser } from "./user";
import { Observable } from "rxjs";
@Injectable({
   providedIn: 'root'
})

export class UserService{
 constructor(private http:HttpClient){};
 getUser():Observable<IUser[]>{
    return this.http.get<IUser[]>(apiUrl.apiUrl);
 }
}