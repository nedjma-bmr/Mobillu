import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImporterBonCommandePage } from './importer-bon-commande.page';

describe('ImporterBonCommandePage', () => {
  let component: ImporterBonCommandePage;
  let fixture: ComponentFixture<ImporterBonCommandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImporterBonCommandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImporterBonCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
