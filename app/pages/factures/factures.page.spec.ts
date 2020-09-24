import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacturesPage } from './factures.page';

describe('FacturesPage', () => {
  let component: FacturesPage;
  let fixture: ComponentFixture<FacturesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
