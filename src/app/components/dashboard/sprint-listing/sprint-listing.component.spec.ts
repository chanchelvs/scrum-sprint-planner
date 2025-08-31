import { TestBed } from '@angular/core/testing';
import { SprintListingComponent } from './sprint-listing.component';


describe('SprintListingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintListingComponent]  // 👈 fix is here
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SprintListingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
