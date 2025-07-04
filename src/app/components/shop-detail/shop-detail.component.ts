import { Component, OnInit, Input } from '@angular/core';
import { Shop} from 'src/app/models/shop.model';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
})
export class ShopDetailComponent implements OnInit {

  @Input() data: Shop;
  @Input() isLoading;

  constructor() { }

  ngOnInit() {}

  getCuisine(cuisine) {
    return cuisine.join(', ');
  }

}
