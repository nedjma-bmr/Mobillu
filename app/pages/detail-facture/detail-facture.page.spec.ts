import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailFacturePage } from './detail-facture.page';

describe('DetailFacturePage', () => {
  let component: DetailFacturePage;
  let fixture: ComponentFixture<DetailFacturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFacturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailFacturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
