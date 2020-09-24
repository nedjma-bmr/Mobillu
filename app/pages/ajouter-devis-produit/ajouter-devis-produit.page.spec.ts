import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterDevisProduitPage } from './ajouter-devis-produit.page';

describe('AjouterDevisProduitPage', () => {
  let component: AjouterDevisProduitPage;
  let fixture: ComponentFixture<AjouterDevisProduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterDevisProduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterDevisProduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
