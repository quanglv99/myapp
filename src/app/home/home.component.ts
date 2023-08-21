import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '../shared/services/app.service';
import { HttpClient } from '@angular/common/http';
import { TableUser } from '../shared/models/tableUser.interface';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: TableUser[] = [];
  currentPage = 1; // Current page number
  totalItems = 0;
  searchText: string = '';
  filterData: TableUser[] = [];
  isSearchActive: boolean = false;
  activeTab:string='home';
  constructor(
    private router: Router,
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const url = this.appConfig.getHomeUrl();
    this.http.get(url).subscribe(
      (arrData: any) => {
        this.data = arrData;
      },
      (error) => {
        console.log(error);
      }
    );
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

  applySearch() {
    if (this.searchText) {
      const input = this.searchText.toLowerCase();

      this.filterData = this.data.filter((item) =>
        item.name.toLowerCase().includes(input)
      );

      this.totalItems = this.filterData.length;

      this.currentPage = 1;

      this.isSearchActive = true;
    } else {
      this.filterData = this.data;

      this.totalItems = this.data.length;

      this.currentPage = 1;

      this.isSearchActive = false;
    }
  }

  openNav(){
    const mySidenav = document.getElementById('mySidenav');
  if (mySidenav) {
    mySidenav.style.width = "250px";
  }
  
  const tableElement = document.getElementById('panel');
  if (tableElement) {
    tableElement.style.marginLeft = "250px";
  }
  }
  closeNav(){
    const mySidenav = document.getElementById('mySidenav');
  if (mySidenav) {
    mySidenav.style.width = "0";
  }
  
  const tableElement = document.getElementById('panel');
  if (tableElement) {
    tableElement.style.marginLeft = "0";
  }
  }

  title:string='Home';

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
    this.closeNav();
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
