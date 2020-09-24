import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjoutCommandPage } from './ajout-command.page';

describe('AjoutCommandPage', () => {
  let component: AjoutCommandPage;
  let fixture: ComponentFixture<AjoutCommandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCommandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutCommandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
