import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduitsFacturePage } from './produits-facture.page';

describe('ProduitsFacturePage', () => {
  let component: ProduitsFacturePage;
  let fixture: ComponentFixture<ProduitsFacturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitsFacturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitsFacturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
