import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './Layouts/base-layout/base-layout.component';

const routes: Routes = [
{ path : " ", component : BaseLayoutComponent , children:[
  {path : " " , component : HomepageComponent}
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
