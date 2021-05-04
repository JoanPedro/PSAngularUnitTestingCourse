import { HeroService } from './../hero.service';
import { Hero } from './../hero';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let sut: HeroesComponent;
  let heroes: Hero[];
  let mockHeroService: jasmine.SpyObj<HeroService>;

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Women', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes', 'addHero', 'deleteHero'
    ]);

    sut = new HeroesComponent(mockHeroService);
  })

  describe('onInit', () => {
    it('Shoud call onInit method', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      sut.heroes = heroes;

      sut.ngOnInit()

      expect(mockHeroService.getHeroes).toHaveBeenCalled();
    })
  })

  describe('delete', () => {
    it('Should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      sut.heroes = heroes;

      sut.delete(heroes[2]);

      const result = sut.heroes;

      const fakeResult = [
        { id: 1, name: 'SpiderDude', strength: 8 },
        { id: 2, name: 'Wonderful Women', strength: 24 }
      ];

      expect(result.length).toBe(2);
      expect(result).toEqual(fakeResult);
    })

    it('Should not remove any hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      sut.heroes = heroes;

      sut.delete({ id: 9999, name: 'any name', strength: 9999 });

      const result = sut.heroes;

      expect(result.length).toBe(3);
      expect(result).toEqual(heroes);
    })

    it('Should call delete hero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      sut.heroes = heroes;

      sut.delete(heroes[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
    })
  })

  describe('create', () => {
    it('Should add a hero to list when add method was called', () => {
      const fakeHero: Hero = { id: 4, name: 'A Fake Hero', strength: 11 };
      mockHeroService.addHero.and.returnValue(of(fakeHero));
      sut.heroes = heroes;

      sut.add(fakeHero.name);

      const result = sut.heroes;

      const fakeResult = [
        { id: 1, name: 'SpiderDude', strength: 8 },
        { id: 2, name: 'Wonderful Women', strength: 24 },
        { id: 3, name: 'SuperDude', strength: 55 },
        { id: 4, name: 'A Fake Hero', strength: 11 }
      ];

      expect(result.length).toBe(4);
      expect(result).toEqual(fakeResult);
    })

    it('Should not perform add operation when method was called with empty string', () => {
      sut.heroes = heroes;

      sut.add("");

      const result = sut.heroes;

      expect(result.length).toBe(3);
      expect(result).toEqual(heroes);
    })

    it('Should call add hero', () => {
      const fakeHero: Hero = { id: 4, name: 'A Fake Hero', strength: 11 };
      mockHeroService.addHero.and.returnValue(of(fakeHero));
      sut.heroes = heroes;

      sut.add(fakeHero.name);

      expect(mockHeroService.addHero).toHaveBeenCalledWith({ name: fakeHero.name, strength: fakeHero.strength } as Hero)
    })
  })

  describe('list', () => {
    it('Should returns a list with all Heroes', () => {
      const fakeHero: Hero = { id: 4, name: 'A Fake Hero', strength: 11 };
      mockHeroService.addHero.and.returnValue(of(fakeHero));
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      sut.heroes = heroes;

      sut.add(fakeHero.name);
      sut.getHeroes();

      const result = sut.heroes;

      expect(result.length).toBe(4);
    })

    it('Should call getHeroes', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      sut.heroes = heroes;

      sut.getHeroes();

      expect(mockHeroService.getHeroes).toHaveBeenCalled();
    })
  })
})
