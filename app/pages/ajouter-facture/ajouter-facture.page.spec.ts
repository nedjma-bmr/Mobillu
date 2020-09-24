import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterFacturePage } from './ajouter-facture.page';

describe('AjouterFacturePage', () => {
  let component: AjouterFacturePage;
  let fixture: ComponentFixture<AjouterFacturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterFacturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterFacturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
