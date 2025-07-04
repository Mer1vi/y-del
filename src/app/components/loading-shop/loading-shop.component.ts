import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-shop',
  templateUrl: './loading-Shop.component.html',
  styleUrls: ['./loading-Shop.component.scss'],
})
export class LoadingShopComponent implements OnInit {
  
  dummy = Array(10);

  constructor() { }

  ngOnInit() {}

}
