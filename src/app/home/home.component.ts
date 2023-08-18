import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '../shared/services/app.service';
import { HttpClient } from '@angular/common/http';
import { TableUser } from '../shared/models/tableUser.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data:TableUser[]=[];
  currentPage = 1; // Current page number
  totalItems = 0;
  constructor(private router:Router,private appConfig :AppConfigService,private http:HttpClient) { }

  ngOnInit(): void {
    const url = this.appConfig.getHomeUrl();
    this.http.get(url)
    .subscribe((arrData:any)=>{
      this.data =arrData;
    },
    (error)=>{
      console.log(error)
    })
    
  }
  onSignout(){
    this.router.navigate(['/login'])
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
