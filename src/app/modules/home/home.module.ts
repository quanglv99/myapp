import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { TableComponent } from './components/table/table.component';
import { ReportComponent } from './components/report/report.component';
import { LogComponent } from './components/log/log.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    TableComponent,
    ReportComponent,
    LogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDividerModule,
    CanvasJSAngularChartsModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    NgApexchartsModule,
  ]
})
export class HomeModule { }