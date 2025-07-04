import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddArticleItemPage } from './add-article-item.page';
import { AddArticleItemPageRoutingModule } from './add-article-item-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddArticleItemPageRoutingModule
  ],
  declarations: [AddArticleItemPage]
})
export class AddArticleItemPageModule {}
