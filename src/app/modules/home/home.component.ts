import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '../../shared/services/app.service';
import { HttpClient } from '@angular/common/http';
import { TableUser } from '../../data/models/tableUser.interface';
import { AuthService } from '../../core/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  data: any;
  activeTab:string='home';
  title:string='Home';
  displayedColumns: string[] = ['id', 'name', 'avatar', 'createdAt'];
  dataSource: any;
  constructor(
    private router: Router,
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {
   
  }
  getDataTable(){
    const url = this.appConfig.getHomeUrl();
    this.http.get(url).subscribe((result)=>{
      this.data = result;

      this.dataSource = new MatTableDataSource<TableUser>(this.data);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  ngOnInit(): void {
    this.getDataTable();
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  onSignout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to sign out?', showYesNo: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
        localStorage.removeItem('rememberUsername');
        localStorage.removeItem('rememberPassword');
      }
    });
  }

  switchTab(tabName:string){
    this.activeTab = tabName;
    if (tabName === 'table') {
      this.title = 'Table';
    } else if (tabName === 'system') {
      this.title = 'System';
    } else if (tabName === 'contact') {
      this.title = 'Contact';
    }else{
      this.title = 'Home'
    }
  }

}
