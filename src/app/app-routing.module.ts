import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegComponent } from './reg/reg.component';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: 'reg', component: RegComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/reg', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
