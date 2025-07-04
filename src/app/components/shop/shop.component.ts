import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'src/app/models/shop.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  fallbackImage = 'assets/imgs/1.jpg';
  @Input() shop: Shop;

  constructor() { }

  ngOnInit() {}

  getCuisine(cuisine) {
    return cuisine.join(', ');
  }

  onImgError(event) {
    event.target.src = this.fallbackImage;
  }

}
