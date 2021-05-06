import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { Provider } from '@angular/core';
import { Location } from '@angular/common';
import { HeroService } from './../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { assert } from 'console';

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
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ] as Array<Provider>
    })
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValues(of({ id: 3, name: 'Any Fake Name', strength: 11 }))
  })

  it('Should render the hero name in a h2 tag', () => {
    fixture.detectChanges();
    const doc = fixture.nativeElement as HTMLDocument;
    const h2Content = (doc.querySelector('h2') as HTMLHeadElement).textContent;

    const debugElement = fixture.debugElement;
    const h2Content_ = (debugElement.query(By.css('h2')).nativeElement as HTMLHeadElement).textContent;

    expect(h2Content).toContain('ANY FAKE NAME')
    expect(h2Content_).toContain('ANY FAKE NAME')
  })

  it('Should call updateHero when save is called', (done) => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.componentInstance.save();
    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled()
      done();
    }, 300);
  })
})
