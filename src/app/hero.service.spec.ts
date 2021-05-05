import { MessageService } from './message.service';
import { HeroService } from './hero.service';
import { inject, TestBed } from "@angular/core/testing"
import { Provider } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

describe('HeroService', () => {
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let httpTestingController: HttpTestingController;

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
  })

  describe('getHero', () => {
    it('Should call get with the correct URL',
      inject([
        HeroService,
        HttpTestingController
      ], (
        heroService: HeroService,
        controller: HttpClientTestingModule
      ) => {
        heroService.getHero(4).subscribe();
      }
    ));
  });
})
