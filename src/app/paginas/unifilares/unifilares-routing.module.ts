import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnifilaresPage } from './unifilares.page';

const routes: Routes = [
  {
    path: '',
    component: UnifilaresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnifilaresPageRoutingModule {}
