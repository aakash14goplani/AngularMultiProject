import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../services/hero.service';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockHeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHero']);

    TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent,
        HeroSearchComponent 
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    mockHeroService.getHero.and.returnValue(of({
      id: 99,
      name: 'Aakash',
      strength: 99
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
