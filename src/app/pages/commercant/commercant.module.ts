import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommercantPageRoutingModule } from './commercant-routing.module';

import { CommercantPage } from './commercant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommercantPageRoutingModule
  ],
  declarations: [CommercantPage]
})
export class CommercantPageModule {}
