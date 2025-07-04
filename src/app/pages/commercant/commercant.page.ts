import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-commercant',
  templateUrl: './commercant.page.html',
  styleUrls: ['./commercant.page.scss'],
})
export class CommercantPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public global: GlobalService,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.global.showLoader();
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot('/login');
      this.global.hideLoader();
    })
    .catch(e => {
      console.log(e);
      this.global.hideLoader();
      this.global.errorToast('Logout Failed! Check your internet connection');
    });
  }

}
