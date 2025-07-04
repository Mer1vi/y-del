import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommercantPage } from './commercant.page';

const routes: Routes = [
  {
    path: '',
    component: CommercantPage
  },
  {
    path: 'add-banner',
    loadChildren: () => import('./add-banner/add-banner.module').then( m => m.AddBannerPageModule)
  },
  {
    path: 'add-shop',
    loadChildren: () => import('./add-shop/add-shop.module').then( m => m.AddShopPageModule)
  },
  {
    path: 'add-article-item',
    loadChildren: () => import('./add-article-item/add-article-item.module').then( m => m.AddArticleItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommercantPageRoutingModule {}
