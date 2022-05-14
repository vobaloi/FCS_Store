import { HomeComponent } from './components/home/home.component';
import { FcsContainComponent } from './components/fcs-contain/fcs-contain.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: FcsContainComponent, children: [
    {path: 'home', component: HomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FcsRoutingModule { }
