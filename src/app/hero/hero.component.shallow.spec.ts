import { HeroComponent } from './hero.component';
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (Shallow Test [Using Dependency Injection by TESTBED & MOCKS & FIXTURE])', () => {
  let fixture: ComponentFixture<HeroComponent>;

  const makeSut = (fixtur: ComponentFixture<HeroComponent>) => ({
    sut: fixtur.componentInstance
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(HeroComponent);
  })

  it('Should have the correct hero', () => {
    const { sut } = makeSut(fixture);
    sut.hero = { id: 1, name: 'Any Fake Hero', strength: 3 };

    expect(sut.hero.name).toEqual('Any Fake Hero')
  })

  it('Should render the hero name in an anchor tag (Using Native DOM)', () => {
    const { sut } = makeSut(fixture);
    sut.hero = { id: 1, name: 'Any Fake Hero', strength: 3 };

    // Enable trigger changes detection cycle for the component (Bindings/Interpolation)!
    fixture.detectChanges();

    // All entiry document HTML page!
    const doc = fixture.nativeElement as HTMLDocument;

    // Select anchor text content (Inside it)!
    const anchorContent = doc.querySelector('a').textContent;

    expect(anchorContent).toContain('Any Fake Hero')
  })

  it('Should render the hero name in an anchor tag (Using DebugElement Angular)', () => {
    const { sut } = makeSut(fixture);
    sut.hero = { id: 1, name: 'Any Fake Hero', strength: 3 };

    // Enable trigger changes detection cycle for the component (Bindings/Interpolation)!
    fixture.detectChanges();

    // All entiry document HTML page with some Angular helper methods!
    const deb = fixture.debugElement as DebugElement;

    // Select anchor element!
    const anchorElement = deb.query(By.css('a')).nativeElement as HTMLAnchorElement;

    expect(anchorElement.textContent).toContain('Any Fake Hero')
  })
})
