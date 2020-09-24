import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterLivraisonProduitsPage } from './ajouter-livraison-produits.page';

describe('AjouterLivraisonProduitsPage', () => {
  let component: AjouterLivraisonProduitsPage;
  let fixture: ComponentFixture<AjouterLivraisonProduitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterLivraisonProduitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterLivraisonProduitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
