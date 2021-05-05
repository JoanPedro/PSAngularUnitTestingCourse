import { HeroComponent } from './../hero/hero.component';
import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (Deep Test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let heroes: Hero[];

  const setupDeep = (
    fixtur: ComponentFixture<HeroesComponent>,
    mockHeroService: jasmine.SpyObj<HeroService>
  ) => {
    /* It's needed because detectChanges trigger onInit method.
    So, in this, the getHeroes methods is called; needing the mock! */
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixtur.detectChanges();
  }

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Women', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes', 'getHeroNo404', 'getHero', 'searchHeroes', 'addHero', 'deleteHero', 'updateHero'
    ]);

    TestBed.configureTestingModule({
      declarations: [ HeroesComponent, HeroComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })

    fixture = TestBed.createComponent(HeroesComponent);
    setupDeep(fixture, mockHeroService);
  });

  it('Should render each hero as a HeroComponent', () => {
    const debugElements = fixture.debugElement;
    const heroComponentDEs = debugElements.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toBe(3)
  });

  it('Should pass down hero data correctly of Parent to Child', () => {
    const debugElements = fixture.debugElement;
    const heroComponentDEs = debugElements.queryAll(By.directive(HeroComponent));
    heroComponentDEs.forEach((heroComponentDE, index) => {
      expect(heroComponentDE.componentInstance.hero).toEqual(heroes[index])
    })
  });
});
