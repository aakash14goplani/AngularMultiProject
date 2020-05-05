import { TestBed, ComponentFixture } from "@angular/core/testing";
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../services/hero.service';
import { Hero } from '../model/hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponentShallowTesting', () => {

    let mockHeroService;
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
    }

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
                FakeHeroComponent
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

    it('should set heroes correctly from service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(component.heroes.length).toBe(3);
    });

    it('should create one `li` for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        let debugElementAroundList = fixture.debugElement.queryAll(By.css('li'));
        
        expect(debugElementAroundList.length).toBe(3);
    });
});