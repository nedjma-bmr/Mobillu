import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailBonLivraisonPage } from './detail-bon-livraison.page';

describe('DetailBonLivraisonPage', () => {
  let component: DetailBonLivraisonPage;
  let fixture: ComponentFixture<DetailBonLivraisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBonLivraisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailBonLivraisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
