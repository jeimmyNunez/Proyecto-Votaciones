import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatoRoutingModule } from './candidato-routing.module';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    CandidatoRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class CandidatoModule { }