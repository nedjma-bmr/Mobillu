import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterDevisPage } from './ajouter-devis.page';

describe('AjouterDevisPage', () => {
  let component: AjouterDevisPage;
  let fixture: ComponentFixture<AjouterDevisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterDevisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterDevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
