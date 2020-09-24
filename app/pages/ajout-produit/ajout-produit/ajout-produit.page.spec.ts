import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjoutProduitPage } from './ajout-produit.page';

describe('AjoutProduitPage', () => {
  let component: AjoutProduitPage;
  let fixture: ComponentFixture<AjoutProduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutProduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutProduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
