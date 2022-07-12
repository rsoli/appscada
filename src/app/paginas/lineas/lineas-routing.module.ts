import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineasPage } from './lineas.page';

const routes: Routes = [
  {
    path: '',
    component: LineasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LineasPageRoutingModule {}
