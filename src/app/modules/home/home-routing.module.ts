import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { TableComponent } from './components/table/table.component';
import { ReportComponent } from './components/report/report.component';
import { LogComponent } from './components/log/log.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard-tab', pathMatch: 'full' },
      { path: 'dashboard-tab', component: DashboardComponent },
      { path: 'table-tab', component: TableComponent },
      { path: 'report-tab', component:  ReportComponent},
      { path: 'log-tab', component:  LogComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
