import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommandeProduitsImporterPage } from './commande-produits-importer.page';

describe('CommandeProduitsImporterPage', () => {
  let component: CommandeProduitsImporterPage;
  let fixture: ComponentFixture<CommandeProduitsImporterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeProduitsImporterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeProduitsImporterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
