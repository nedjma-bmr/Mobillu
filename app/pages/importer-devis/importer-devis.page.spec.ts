import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImporterDevisPage } from './importer-devis.page';

describe('ImporterDevisPage', () => {
  let component: ImporterDevisPage;
  let fixture: ComponentFixture<ImporterDevisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImporterDevisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImporterDevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
