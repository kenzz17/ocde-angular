import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegComponent } from './reg/reg.component';
import { EditorComponent } from './editor/editor.component';
const routes: Routes = [
  { path: 'reg', component: RegComponent },
  { path: 'editor', component: EditorComponent },
  { path: '', redirectTo: '/editor', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
