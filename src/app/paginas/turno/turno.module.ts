import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurnoPageRoutingModule } from './turno-routing.module';

import { TurnoPage } from './turno.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurnoPageRoutingModule,
    ComponentesModule
  ],
  declarations: [TurnoPage]
})
export class TurnoPageModule {}
