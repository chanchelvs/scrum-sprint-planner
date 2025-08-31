import { TestBed } from '@angular/core/testing';
import { StoryListingComponent } from './story-listing.component';

describe('StoryListingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryListingComponent]  // 👈 fix is here
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StoryListingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
