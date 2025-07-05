import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { SearchLocationComponent } from 'src/app/components/search-location/search-location.component';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Shop } from 'src/app/models/shop.model';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.page.html',
  styleUrls: ['./add-shop.page.scss'],
})
export class AddShopPage implements OnInit {

  isLoading: boolean = false;
  coverImage: any = '../../../../assets/imgs/upload.webp';
  cities: any[] = [];
  location: any = {};
  category: string;
  isCuisine: boolean = false;
  cuisines: any[] = [];
  categories: any[] = [];
  openTime: string;
  closeTime: string

  constructor(
    private authService: AuthService, 
    public afStorage: AngularFireStorage,
    public apiService: ApiService,
    private global: GlobalService) { }

  ngOnInit() {
    this.getCities();
  }

  async getCities() {
    try {
      this.cities = await this.apiService.getCities();
    } catch(e) {
      console.log(e);
      this.global.errorToast();
    }
  }

  async searchLocation() {
    try {
      const options = {
        component: SearchLocationComponent,
      };
      const modal = await this.global.createModal(options);
      if(modal) {
        console.log(modal);
        this.location = modal;
      }
    } catch(e) {
      console.log(e);

    }
  }

  addCategory() {
    console.log(this.category);
    if(this.category.trim() == '') return;
    console.log(this.isCuisine);
    const checkString = this.categories.find(x => x == this.category);
    if(checkString) {
      this.global.errorToast('Category already added');
      return;
    }
    this.categories.push(this.category);
    if(this.isCuisine) this.cuisines.push(this.category);
  }

  clearCategory() {
    this.categories = [];
    this.cuisines = [];
  }

  getArrayAsString(array) {
    return array.join(', ');
  }

  preview(event) {
    console.log(event);
    const files = event.target.files;
    if(files.length == 0) return;
    const mimeType = files[0].type;
    if(mimeType.match(/image\/*/) == null) return;
    const file = files[0];
              console.log('url image', files)

    const filePath = 'shops/' + Date.now() + '_' + file.name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        const downloadUrl = fileRef.getDownloadURL();
        downloadUrl.subscribe(url => {
          console.log('url image', url)
          console.log('url: ', url);
          if(url) {
            this.coverImage = url;
          }
        })
      })
    )
    .subscribe(url => {
      console.log('data: ', url);
    });
  }

  onSubmit(form: NgForm) {
    if(!form.valid) return;
    if(!this.coverImage || this.coverImage == '') {
      this.global.errorToast('Please select a cover image');
      return;
    }
    if(this.location && this.location?.lat) this.addShop(form);
    else this.global.errorToast('Please select address for this shop');
  }

  async addShop(form: NgForm) {
    try {
      this.isLoading = true;
      console.log(form.value);
      const data = await this.authService.register(form.value, 'shop');
      if(data?.id) {
        const position = new firebase.firestore.GeoPoint(this.location.lat, this.location.lng);
        const shop = new Shop(
          data.id,
          this.coverImage ? this.coverImage : '',
          form.value.sho_name,
          (form.value.sho_name).toLowerCase(),
          this.cuisines,
          0,
          form.value.delivery_time,
          form.value.price,
          form.value.phone,
          form.value.email,
          false,
          form.value.description,
          form.value.openTime,
          form.value.closeTime,
          form.value.city,
          this.location.address,
          'active',
          0,
          position
        );
        const result = await this.apiService.addShop(shop, data.id);
        console.log(result);
        await this.apiService.addCategories(this.categories, data.id);
        // form.reset();
        this.global.successToast('shop Added Successfully');
      } else {
        this.global.showAlert('shop Registration failed');
      }
      this.isLoading = false;       
    } catch(e) {
      console.log(e);
      this.isLoading = false;
      let msg: string = 'Could not register the shop, please try again.';
      if(e.code == 'auth/email-already-in-use') {
        msg = e.message;
      }
      this.global.showAlert(msg);
    }
  }

}
