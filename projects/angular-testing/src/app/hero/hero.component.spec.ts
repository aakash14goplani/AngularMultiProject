import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    /* testbed - help to test component and template together */
    TestBed.configureTestingModule({
      declarations: [ HeroComponent ],
      schemas: [NO_ERRORS_SCHEMA] // ignore unknow attributes like routerLink, we want to ignore that because on click we don't want to navigate on different tetsing module
    });
    // fixture is wrapper around component
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct hero property', () => {
    component.hero = {
      id: 99,
      name: 'Aakash',
      strength: 99
    };

    expect(component.hero).toBeDefined();
  });

  it('should render hero name in anchor tag', () => {
    component.hero = {
      id: 99,
      name: 'Aakash',
      strength: 99
    };
    // bindings like {{ hero.name }} don't get update until change detection runs
    fixture.detectChanges();
    // debugElement acts as a wrapper around native dom api
    let debugElementAroundAnchorTag = fixture.debugElement.query(By.css('a'));
    expect(debugElementAroundAnchorTag.nativeElement.textContent).toContain('Aakash');
    // avoid using native dom interaction
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('Aakash');
  });
});
