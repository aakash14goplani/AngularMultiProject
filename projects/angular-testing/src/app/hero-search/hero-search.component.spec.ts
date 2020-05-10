import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../services/hero.service';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let mockHeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['searchHeroes']);

    TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    });
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
