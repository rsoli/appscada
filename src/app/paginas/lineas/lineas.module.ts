import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineasPageRoutingModule } from './lineas-routing.module';

import { LineasPage } from './lineas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineasPageRoutingModule
  ],
  declarations: [LineasPage]
})
export class LineasPageModule {}
