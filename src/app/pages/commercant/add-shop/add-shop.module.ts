import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddShopPage } from './add-shop.page';
import { AddShopPageRoutingModule } from './add-shop-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddShopPageRoutingModule,
  ],
  declarations: [AddShopPage]
})
export class AddShopPageModule {}
