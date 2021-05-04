import { HeroComponent } from './hero.component';
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroComponent (Shallow Test)', () => {
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

  it('Should render the hero name in an anchor tag', () => {
    const { sut } = makeSut(fixture);
    sut.hero = { id: 1, name: 'Any Fake Hero', strength: 3 };

    // Enable trigger changes detection cycle for the component (Bindings/Interpolation)!
    fixture.detectChanges();

    // All entiry document HTML Page!
    const DOM = fixture.nativeElement as HTMLDocument;

    // Select Anchor Text Content (Inside it)!
    const anchorContent = DOM.querySelector('a').textContent;

    expect(anchorContent).toContain('Any Fake Hero')
  })
})
