import { MessageService } from './message.service';
import { HeroService } from './hero.service';
import { inject, TestBed } from "@angular/core/testing"
import { Provider } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { Hero } from './hero';

describe('HeroService', () => {
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add', 'clear']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ] as Array<Provider>
    });

    // Handle a Service: ex. const heroService = TestBed.get(HeroService)
    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  })

  describe('getHero', () => {
    it('Should call get with the correct URL', () => {
      const id: number = 4;
      const fakeHero: Hero = { id, name: 'Any Fake Hero', strength: 99 }
      heroService.getHero(id).subscribe({
        next: (hero: Hero) => expect(hero).toEqual(fakeHero)
      });

      const req = httpTestingController.expectOne(`api/heroes/${id}`);
      req.flush(fakeHero);

      httpTestingController.verify();
    });
  });
})
