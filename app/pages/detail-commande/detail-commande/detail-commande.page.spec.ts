import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailCommandePage } from './detail-commande.page';

describe('DetailCommandePage', () => {
  let component: DetailCommandePage;
  let fixture: ComponentFixture<DetailCommandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCommandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
