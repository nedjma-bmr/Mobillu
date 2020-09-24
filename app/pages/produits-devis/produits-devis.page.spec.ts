import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduitsDevisPage } from './produits-devis.page';

describe('ProduitsDevisPage', () => {
  let component: ProduitsDevisPage;
  let fixture: ComponentFixture<ProduitsDevisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitsDevisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitsDevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
