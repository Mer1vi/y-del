import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-shop',
  templateUrl: './loading-shop.component.html',
  styleUrls: ['./loading-shop.component.scss'],
})
export class LoadingShopComponent implements OnInit {
  
  dummy = Array(10);

  constructor() { }

  ngOnInit() {}

}
