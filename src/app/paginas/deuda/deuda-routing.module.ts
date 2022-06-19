import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeudaPage } from './deuda.page';

const routes: Routes = [
  {
    path: '',
    component: DeudaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeudaPageRoutingModule {}
