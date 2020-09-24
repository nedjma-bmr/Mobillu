import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValiderFacturePage } from './valider-facture.page';

describe('ValiderFacturePage', () => {
  let component: ValiderFacturePage;
  let fixture: ComponentFixture<ValiderFacturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiderFacturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValiderFacturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
