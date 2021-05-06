import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { Provider } from '@angular/core';
import { Location } from '@angular/common';
import { HeroService } from './../hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockLocation: jasmine.SpyObj<Location>;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute: any;

  beforeEach(() => {
    // Hand Mock
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '3'
        }
      }
    }
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ] as Array<Provider>
    })
    fixture = TestBed.createComponent(HeroDetailComponent);
  })
})
