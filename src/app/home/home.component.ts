import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '../shared/services/app.service';
import { HttpClient } from '@angular/common/http';
import { TableUser } from '../shared/models/tableUser.interface';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data:TableUser[]=[];
  currentPage = 1; // Current page number
  totalItems = 0;
  constructor(private router:Router,private appConfig :AppConfigService,
              private http:HttpClient,private authService: AuthService,
              private dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to sign out?',
              showYesNo: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login'])
        localStorage.removeItem('rememberUsername')
        localStorage.removeItem('rememberPassword')
      }
    });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
