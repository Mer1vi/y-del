import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommercantPage } from './commercant.page';

describe('AdminPage', () => {
  let component: CommercantPage;
  let fixture: ComponentFixture<CommercantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommercantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
