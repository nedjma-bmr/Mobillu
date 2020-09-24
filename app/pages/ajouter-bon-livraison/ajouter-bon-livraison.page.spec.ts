import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterBonLivraisonPage } from './ajouter-bon-livraison.page';

describe('AjouterBonLivraisonPage', () => {
  let component: AjouterBonLivraisonPage;
  let fixture: ComponentFixture<AjouterBonLivraisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterBonLivraisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterBonLivraisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
