import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServerConfigPage } from './server-config.page';

describe('ServerConfigPage', () => {
  let component: ServerConfigPage;
  let fixture: ComponentFixture<ServerConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerConfigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServerConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
