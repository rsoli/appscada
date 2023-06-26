import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnifilaresPageRoutingModule } from './unifilares-routing.module';

import { UnifilaresPage } from './unifilares.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnifilaresPageRoutingModule
  ],
  declarations: [UnifilaresPage]
})
export class UnifilaresPageModule {}
