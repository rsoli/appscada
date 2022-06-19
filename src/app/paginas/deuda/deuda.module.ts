import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeudaPageRoutingModule } from './deuda-routing.module';

import { DeudaPage } from './deuda.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeudaPageRoutingModule,
    ComponentesModule
  ],
  declarations: [DeudaPage]
})
export class DeudaPageModule {}
