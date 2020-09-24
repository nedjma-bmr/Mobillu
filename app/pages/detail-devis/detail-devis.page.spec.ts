import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailDevisPage } from './detail-devis.page';

describe('DetailDevisPage', () => {
  let component: DetailDevisPage;
  let fixture: ComponentFixture<DetailDevisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDevisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailDevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
