import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Input, Provider } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './../hero/hero.component';
import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { Hero } from '../hero';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigateTo: any = null;

  onClick() {
    this.navigateTo = this.linkParams;
  }
}

describe('HeroesComponent (Deep Test [Integration Test with Parent & Child Components])', () => {
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
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
      ] as Array<Provider>,
      // schemas: [NO_ERRORS_SCHEMA]
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

  it(`Should call heroService.deleteHero when
    the Hero Component's delete button is clicked`, () => {
    const heroesComponent = fixture.componentInstance;

    // Watch HeroesComponent delete method!
    spyOn(heroesComponent, 'delete');

    const debugElements = fixture.debugElement;
    const heroComponents = debugElements.queryAll(By.directive(HeroComponent));

    /* In HeroComponent, the delete method use event -> stopPragation method.
      So, mock this method in on dummy test double! (It can be doing by Jasmine's spyObj) */
    heroComponents.forEach((heroDE, index) => {
      heroDE.query(By.css('button'))
        .triggerEventHandler('click', { stopPropagation: () => { } });

      expect(heroesComponent.delete).toHaveBeenCalledWith(heroes[index]);
    })
  })

  it(`Should call heroService.deleteHero when
    the event raising on child directive`, () => {
    const heroesComponent = fixture.componentInstance;

    // Watch HeroesComponent delete method!
    spyOn(heroesComponent, 'delete');

    const debugElements = fixture.debugElement;
    const heroComponents = debugElements.queryAll(By.directive(HeroComponent));

    /* In HeroComponent, the delete event is handling.
      So, emit itselft! */
    heroComponents.forEach((heroDE, index) => {
      heroDE.triggerEventHandler('delete', null);
      expect(heroesComponent.delete).toHaveBeenCalledWith(heroes[index]);
    })
  })

  it('Should add a new hero to the hero list when the add button is clicked', () => {
    const name = 'Any new hero name';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 11 }));
    const debugElements = fixture.debugElement;
    const inputElement = (debugElements.query(By.css('input')).nativeElement as HTMLInputElement);
    const addButtomDE = (debugElements.queryAll(By.css('button'))[0]);

    inputElement.value = name;
    addButtomDE.triggerEventHandler('click', null);

    // Trigger Lifecycle change on Angular, to compute new element on HTML (DOM).
    fixture.detectChanges();

    const heroText = (debugElements.query(By.css('ul')).nativeElement as HTMLUListElement).textContent;

    expect(heroText).toContain(name);
  })

  it('Should hhave the correct route for the first hero', () => {
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigateTo).toBe('/detail/1');
  })
});
