import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeTabComponent } from './components/home-tab-component/home-tab-component.component';
import { TableTabComponent } from './components/table-tab-component/table-tab-component.component';
import { SystemTabComponent } from './components/system-tab-component/system-tab-component.component';
import { ContactTabComponent } from './components/contact-tab-component/contact-tab-component.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home-tab', pathMatch: 'full' },
      { path: 'home-tab', component: HomeTabComponent },
      { path: 'table-tab', component: TableTabComponent },
      { path: 'system-tab', component: SystemTabComponent },
      { path: 'contact-tab', component: ContactTabComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
