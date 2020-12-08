import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegComponent } from './reg/reg.component';
import { PasschangeComponent } from './passchange/passchange.component';

const routes: Routes = [
  { path: 'editor', component: EditorComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/reg', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'reg', component: RegComponent },
  { path: 'passchange', component: PasschangeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
