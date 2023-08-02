import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import apiUrl from 'src/assets/userlist.json'
import { IUser } from "./user";
import { Observable } from "rxjs";
@Injectable()

export class UserService{
 private url:string = apiUrl.apiUrl;

 constructor(private http:HttpClient){};

 getUser():Observable<IUser[]>{
    return this.http.get<IUser[]>(this.url);
 }
}