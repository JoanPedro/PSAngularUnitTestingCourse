import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroesComponent (Shallow Test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let heroes: Hero[];

  @Component({ selector: 'app-hero', template: '<div><div>' })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }

  const makeSut = (fixtur: ComponentFixture<HeroesComponent>) => ({
    sut: fixtur.componentInstance
  })

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      'getHeroes', 'getHeroNo404', 'getHero', 'searchHeroes', 'addHero', 'deleteHero', 'updateHero'
    ]);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    })
    fixture = TestBed.createComponent(HeroesComponent);

    heroes = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Women', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];
  })

  it('Should set heroes correctly from the service', () => {
    const { sut } = makeSut(fixture);
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    sut.ngOnInit();

    expect(sut.heroes).toEqual(heroes);
  })
})
