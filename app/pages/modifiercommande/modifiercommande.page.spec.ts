import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifiercommandePage } from './modifiercommande.page';

describe('ModifiercommandePage', () => {
  let component: ModifiercommandePage;
  let fixture: ComponentFixture<ModifiercommandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiercommandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifiercommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
