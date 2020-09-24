import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NouveauBonLivraisonPage } from './nouveau-bon-livraison.page';

describe('NouveauBonLivraisonPage', () => {
  let component: NouveauBonLivraisonPage;
  let fixture: ComponentFixture<NouveauBonLivraisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauBonLivraisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NouveauBonLivraisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
