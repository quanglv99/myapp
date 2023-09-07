import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  activeTab: string = 'dashboard-tab';
  title: string = 'Menu';
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
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
      case 'dashboard-tab':
        this.title = 'Dashboard';
        break;
      case 'table-tab':
        this.title = 'Table';
        break;
      case 'report-tab':
        this.title = 'Report';
        break;
      case 'log-tab':
        this.title = 'Log';
        break;
      default:
        this.title = 'Menu'
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
