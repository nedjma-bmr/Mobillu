import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifierDevisPage } from './modifier-devis.page';

describe('ModifierDevisPage', () => {
  let component: ModifierDevisPage;
  let fixture: ComponentFixture<ModifierDevisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierDevisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierDevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
