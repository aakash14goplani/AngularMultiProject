import { ComponentFixture, TestBed, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../services/hero.service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService, mockActivatedRoute, mockLocation;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
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

  it('should render hero name in h2 tag', () => {
    fixture.detectChanges();
    const debugElementAroundHeader = fixture.debugElement.query(By.css('h2')).nativeElement;

    expect(debugElementAroundHeader.textContent).toContain('AAKASH');
  });

  it('should call updateHero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    component.save();
    // tick(250);
    flush();

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  /* prefer fakeAsync */
  it('ALTERNATE => should call updateHero when save is called', async(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    component.testSaveWithAsync();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  }))
});
