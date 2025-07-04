import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { Banner } from 'src/app/models/banner.model';
import { Shop } from 'src/app/models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  radius = 20;// in km
  firestore = firebase.firestore();
  GeoFirestore = geofirestore.initializeApp(this.firestore);

  Shops: Shop[] = [];
  allShops: Shop[] = [];
  shop1: Shop[] = [];  
  categories: Category[] = [];
  allItems: Item[] = [];
  addresses: Address[] = [];
  orders: Order[] = [];

  constructor(
    private adb: AngularFirestore
  ) {}

  collection(path, queryFn?) {
    return this.adb.collection(path, queryFn);
  }

  geoCollection(path) {
    return this.GeoFirestore.collection(path);
  }

  randomString() {
    const id = Math.floor(100000000 + Math.random() * 900000000);
    return id.toString();
  }

  // banner apis
  async addBanner(data) {
    try {
      const id = this.randomString();
      // data.id = id;
      const bannerData = new Banner(
        id, 
        data.banner, 
        data.status
      );
      let banner = Object.assign({}, bannerData);
      delete banner.sho_id;
      await this.collection('banners').doc(id).set(banner);
      return true;
    } catch(e) {
      console.log(e);
      throw(e);
    }
  }

  async getBanners() {
    try {
      const banners: Banner[] = await this.collection('banners').get().pipe(
        switchMap(async(data: any) => {
          let bannerData = await data.docs.map(element => {
            const item = element.data();
            return item;
          });
          console.log(bannerData);
          return bannerData;
        })
      ).toPromise();
      console.log(banners);
      return banners;
    } catch(e) {
      throw(e);
    }
  }

  // city apis
  async getCities() {
    try {
      const cities = await this.collection('cities').get().pipe(
        switchMap(async(data: any) => {
          let cityData = await data.docs.map(element => {
            let item = element.data();
            item.uid = element.id;
            return item;
          });
          console.log(cityData);
          return cityData;
        })
      ).toPromise();
      console.log(cities);
      return cities;
    } catch(e) {
      throw(e);
    }
  }

  //  restaurant apis
  async addShop(data: any, uid) {
    try {
      let shop = Object.assign({}, data);
      delete shop.g;
      delete shop.distance;
      console.log(shop);
      const response = await this.geoCollection('shops').doc(uid).set(shop);
      return response;
    } catch(e) {
      throw(e);
    }
  }

  async getShops() {
    try {
      const shops = await this.collection('shops').get().pipe(
        switchMap(async(data: any) => {
          let shopData = await data.docs.map(element => {
            const item = element.data();
            return item;
          });
          console.log(shopData);
          return shopData;
        })
      ).toPromise();
      console.log(shops);
      return shops;
    } catch(e) {
      throw(e);
    }
  }

  async getShopById(id): Promise<any> {
    try {
      const shop = (await (this.collection('shops').doc(id).get().toPromise())).data();
      console.log(shop);
      return shop;
    } catch(e) {
      throw(e);
    }
  }

  async getNearbyShops(lat, lng): Promise<any> {
    try {
      const center = new firebase.firestore.GeoPoint(lat, lng);
      const radius = this.radius;
      const data = await (await this.geoCollection('shops').near({ center, radius: this.radius })
      .get()).docs.sort((a, b) => a.distance - b.distance).map(element => {
        let item: any = element.data();
        item.id = element.id;
        item.distance = element.distance;
        return item;
      });
      return data;
    } catch(e) {
      throw(e);
    }
  }

  // categories
  async getShopCategories(uid) {
    try {
      const categories = await this.collection(
        'categories',
        ref => ref.where('uid', '==', uid)
      ).get().pipe(
        switchMap(async(data: any) => {
          let categoryData = await data.docs.map(element => {
            const item = element.data();
            return item;
          });
          console.log(categoryData);
          return categoryData;
        })
      ).toPromise();
      console.log(categories);
      return categories;
    } catch(e) {
      throw(e);
    }
  }

  async addCategories(categories, uid) {
    try {
      categories.forEach(async(element) => {
        const id = this.randomString();
        const data = new Category(
          id,
          element,
          uid
        );
        const result = await this.collection('categories').doc(id).set(Object.assign({}, data));        
      });
      return true;
    } catch(e) {
      throw(e);
    }
  }

  // menu
  async addArticleItem(data) {
    try {
      const id = this.randomString();
      const item = new Item(
        id,
        data.shop_id,
        this.firestore.collection('categories').doc(data.category_id),
        data.cover,
        data.name,
        data.description,
        data.price,
        data.veg,
        data.status,
        false,
        0
      );
      let itemData = Object.assign({}, item);
      delete itemData.quantity;
      console.log(itemData);
      const result = await this.collection('article').doc(data.restaurant_id).collection('allItems').doc(id).set(itemData);
      return true;
    } catch(e) {
      throw(e);
    }
  }

  async getShopArticle(uid) {
    try {
      const itemsRef = await this.collection('article').doc(uid)
          .collection('allItems', ref => ref.where('status', '==', true));
      const items = itemsRef.get().pipe(
        switchMap(async(data: any) => {
          let itemData = await data.docs.map(element => {
            let item = element.data();
            item.category_id.get()
            .then(cData => {
              item.category_id = cData.data();
            })
            .catch(e => { throw(e); });
            return item;
          });
          console.log(itemData);
          return itemData;
        })
      )
      .toPromise();
      console.log(items);
      return items;
    } catch(e) {
      throw(e);
    }
  }

}