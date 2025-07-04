import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticleItemPage } from './add-article-item.page';


const routes: Routes = [
  {
    path: '',
    component: AddArticleItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddArticleItemPageRoutingModule {}