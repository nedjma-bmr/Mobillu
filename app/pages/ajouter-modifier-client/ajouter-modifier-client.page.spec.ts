import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterModifierClientPage } from './ajouter-modifier-client.page';

describe('AjouterModifierClientPage', () => {
  let component: AjouterModifierClientPage;
  let fixture: ComponentFixture<AjouterModifierClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterModifierClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterModifierClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
