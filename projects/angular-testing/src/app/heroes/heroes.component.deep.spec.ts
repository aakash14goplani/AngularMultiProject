import { TestBed, ComponentFixture } from "@angular/core/testing";
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../services/hero.service';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';
import { RouterLinkDirectiveStub } from '../router-link-directive-stub';

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
                HeroComponent,
                RouterLinkDirectiveStub
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

    it(`should call heroService.deleteHero() method when Hero Component's delete button is clicked`, () => {
        // find the delete method on HerComponent and just watch it for any actions / events that took place
        spyOn(component, 'delete');

        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges(); 

        let heroComponentdebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // fetch buttons from this DOM and trigger click event
        heroComponentdebugElements[0].query(By.css('button')).triggerEventHandler('click', {
            // pass in extra arguments if required, like in this case event.stopPropogation is required
            stopPropagation: () => {}
        });

        expect(component.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it(`should just raise event instead of clicking button manually i.e. child component raises event and parent component is listening to it correctly`, () => {
        // find the delete method on HerComponent and just watch it for any actions / events that took place
        spyOn(component, 'delete');

        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges(); 

        let heroComponentdebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        
        (<HeroComponent>heroComponentdebugElements[0].componentInstance).delete.emit(undefined);

        // alternate way - avoid, confusing and hard
        // heroComponentdebugElements[0].triggerEventHandler('delete', null);        

        expect(component.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add a new hero to hero list when add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges(); 
        const name = 'Aakash';
        mockHeroService.addHero.and.returnValue(of({
            id: 99,
            name: name,
            strength: 99
        }));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);
    });

    it('should have correct route for first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routerLink = heroComponent[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);
        heroComponent[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/11');
    });
});