import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponentIsolatedTesting', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 11, name: 'Mr. Nice', strength: 10 },
      { id: 12, name: 'Narco', strength: 5 },
      { id: 13, name: 'Bombasto', strength: 8 }
    ];
    /*
    - helps to create mock service method
    - if no service methos required component, leave array blank
    - pass method you want to mock
    */
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete given hero from the heroes list', () => {
    // as deleteHero() expects Observable, we should modify our mock object to return dummy observable
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;
    const hero = HEROES[1];
    const initialNumberOfHeroes = component.heroes.length;

    component.delete(hero);

    const finalNumberOfHeroes = component.heroes.length;
    expect(finalNumberOfHeroes).toBeLessThan(initialNumberOfHeroes);
  });

  it('should call deleteHero method', () => {
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES; // equivalent to compoentn.ngOnInit(), there we get dynamic data here we assign static data
    const hero = HEROES[1];

    component.delete(hero);

    expect(mockHeroService.deleteHero).toHaveBeenCalled();
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(hero);
  });

  it('should add given hero to final list', () => {
    component.heroes = HEROES;
    const heroName = 'Aakash';
    mockHeroService.addHero.and.returnValue(of({ name: heroName }));
    const initialNumberOfHeroes = component.heroes.length;

    component.add(heroName);

    const finalNumberOfHeroes = component.heroes.length;
    expect(finalNumberOfHeroes).toBeGreaterThan(initialNumberOfHeroes);
    expect(mockHeroService.addHero).toHaveBeenCalled();
    expect(mockHeroService.addHero).toHaveBeenCalledWith({ name: heroName, strength: 11 });
  });

  it('should get all heroes', () => {
    component.heroes = [];
    const initialNumberOfHeroes = component.heroes.length;
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    component.getHeroes();
    
    const finalNumberOfHeroes = component.heroes.length;
    expect(finalNumberOfHeroes).toBeGreaterThan(initialNumberOfHeroes);
    expect(mockHeroService.getHeroes).toHaveBeenCalled();
  });
});
