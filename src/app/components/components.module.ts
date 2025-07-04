import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { LoadingShopComponent } from './loading-shop/loading-shop.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ShopComponent,
    LoadingShopComponent,
    EmptyScreenComponent,
    SearchLocationComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ShopComponent,
    LoadingShopComponent,
    EmptyScreenComponent,
    SearchLocationComponent
  ],
})
export class ComponentsModule { }
