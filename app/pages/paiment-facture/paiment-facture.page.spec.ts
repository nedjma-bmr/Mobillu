import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaimentFacturePage } from './paiment-facture.page';

describe('PaimentFacturePage', () => {
  let component: PaimentFacturePage;
  let fixture: ComponentFixture<PaimentFacturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaimentFacturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaimentFacturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
