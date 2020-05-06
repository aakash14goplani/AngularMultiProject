import { TestBed, ComponentFixture } from "@angular/core/testing";
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../services/hero.service';
import { Hero } from '../model/hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponentDeepTesting', () => {

    let mockHeroService;
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 11, name: 'Mr. Nice', strength: 10 },
            { id: 12, name: 'Narco', strength: 5 },
            { id: 13, name: 'Bombasto', strength: 8 }
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                // when asked for HeroService provide corresponding mocked service
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
    });

    it('should render each hero as HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        // Directory is Parent class of Attribute Directory and Components
        // fetches all HTML associated with directive <app-hero> i.e. HTML content / debugelements attached to HeroComponent
        let heroComponentdebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // fetch HeroComponent instance
        let heroComponentInstance = heroComponentdebugElements[0].componentInstance;
        
        expect(heroComponentdebugElements.length).toBe(3);

        // check single instance
        expect(heroComponentInstance.hero.name).toBe('Mr. Nice');

        // check all instances
        for (let i = 0; i < heroComponentdebugElements.length; i++) {
            expect(heroComponentdebugElements[i].componentInstance.hero.name).toBe(HEROES[i].name);
        }
    });
});