import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let service: HeroService;
  let messageServiceMock;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    messageServiceMock = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ 
        HeroService,
        { provide: MessageService, useValue: messageServiceMock }
      ]
    });

    // get handle to the service e.g. let heroService = TestBed.get(HeroService);
    httpTestingController = TestBed.get(HttpTestingController);
    
    // service = TestBed.inject(HeroService);
    service = TestBed.get(HeroService);
  });

  describe('getHero', () => {

    it('should call get with the correct URL', () => { 
      service.getHero(4).subscribe();

      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({id: 4, name: 'SuperDude', strength: 100});
      httpTestingController.verify();
      expect(true).toBe(true);
    });

    // alternate method of injecting service
    it('ALTERNATE => should call get with the correct URL', inject(
      [HeroService, HttpTestingController],
      (_service: HeroService, controller: HttpTestingController) => {
        _service.getHero(4).subscribe();

        const req = controller.expectOne('api/heroes/4');
        // data to return when this req comes in
        req.flush({id: 4, name: 'Aakash', strength: 100});
        controller.verify();
        expect(true).toBe(true);
    }));
  })
});
