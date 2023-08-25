import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;
  activeTab: string = 'home';
  title: string = 'Home';
  displayedColumns: string[] = ['id', 'name', 'avatar', 'createdAt'];
  dataSource: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const activeTab = this.getActiveTabFromUrl(event.url);
        this.updateTitle(activeTab);
      }
    });
  }

  private getActiveTabFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  private updateTitle(activeTab: string): void {
    switch (activeTab) {
      case 'home-tab':
        this.title = 'Home';
        break;
      case 'table-tab':
        this.title = 'Table';
        break;
      case 'system-tab':
        this.title = 'System';
        break;
      case 'contact-tab':
        this.title = 'Contact';
        break;
      default:
        this.title = 'Home';
    }
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

}
