import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { ForgetComponent } from './modules/forget/forget.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path:'forget',component:ForgetComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
