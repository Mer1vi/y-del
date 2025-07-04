import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddArticleItemPage } from './add-article-item.page';

describe('AddMenuItemPage', () => {
  let component: AddArticleItemPage;
  let fixture: ComponentFixture<AddArticleItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddArticleItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
