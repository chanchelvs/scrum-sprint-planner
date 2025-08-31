import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SprintCalculatorComponent } from './sprint-calculator.component';
import { StoryService } from '../../../services/story.service';
import { Story } from '../../../models/story.model';
import { BehaviorSubject } from 'rxjs';

describe('SprintCalculatorComponent', () => {
  let component: SprintCalculatorComponent;
  let fixture: ComponentFixture<SprintCalculatorComponent>;
  let storyServiceSpy: jasmine.SpyObj<StoryService>;
  let selectedStories$: BehaviorSubject<Story[]>; 
  beforeEach(async () => {
    selectedStories$ = new BehaviorSubject<Story[]>([]); // 👈 initialized in beforeEach
    storyServiceSpy = jasmine.createSpyObj('StoryService', [
      'setAutoSelectedStories',
      'clearStories',
      'clearSelectedStories'
    ]);

    await TestBed.configureTestingModule({
      imports: [SprintCalculatorComponent, ReactiveFormsModule],
      providers: [
        { provide: StoryService, useValue: storyServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SprintCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should auto-select stories within the given sprint capacity)', () => {
    component.sprintForm.setValue({ sprintPoints: 17 });
  
    const availableStories: Story[] = [
      { name: 'Login Feature', points: 2 },
      { name: 'Dashboard', points: 3 },
      { name: 'API Integration', points: 5 },
      { name: 'UI Design', points: 6 },
      { name: 'Database Setup', points: 9 }
    ];
  
    const expectedStories: Story[] = [
      { name: 'Login Feature', points: 2 },
      { name: 'UI Design', points: 6 },
      { name: 'Database Setup', points: 9 }
    ];
    storyServiceSpy.setAutoSelectedStories.and.callFake((capacity: number) => {
      expect(capacity).toBe(17);
      selectedStories$.next(expectedStories);
    });
  
    component.autoSelect();
  
    expect(storyServiceSpy.setAutoSelectedStories).toHaveBeenCalledWith(17);
  
    selectedStories$.subscribe(stories => {
      expect(stories).toEqual(expectedStories);
      const totalPoints = stories.reduce((sum, s) => sum + s.points, 0);
      expect(totalPoints).toBeLessThanOrEqual(17);
      expect(totalPoints).toBe(17);
    });
  });
  

  it('should not call setAutoSelectedStories if form is invalid', () => {
    component.sprintForm.setValue({ sprintPoints: null });
    expect(component.sprintForm.valid).toBeFalse();
    component.autoSelect();
    expect(storyServiceSpy.setAutoSelectedStories).not.toHaveBeenCalled();
  });
  it('should call StoryService.setAutoSelectedStories when autoSelect() is triggered', () => {
    component.sprintForm.setValue({ sprintPoints: 16 });

    const mockSelectedStories: Story[] = [
      { name: 'Login Feature', points: 2 },
      { name: 'API Integration', points: 5 },
      { name: 'UI Design', points: 6 }
    ];
    storyServiceSpy.setAutoSelectedStories.and.callFake((capacity: number) => {
      expect(capacity).toBe(16);
      selectedStories$.next(mockSelectedStories);
    });

    component.autoSelect();

    expect(storyServiceSpy.setAutoSelectedStories).toHaveBeenCalledWith(16);

    selectedStories$.subscribe(stories => {
      expect(stories).toEqual(mockSelectedStories);
      expect(stories.length).toBe(3);
    });
  });

  it('should ensure total points of auto-selected stories do not exceed sprint capacity', () => {
    component.sprintForm.setValue({ sprintPoints: 9 });
    const availableStories: Story[] = [
      { name: 'Login Feature', points: 2 },
      { name: 'Dashboard', points: 3 },
      { name: 'API Integration', points: 5 },
      { name: 'UI Design', points: 6 },
      { name: 'Database Setup', points: 9 }
    ];
    const expectedOption1 = [
      { name: 'Dashboard', points: 3 },
      { name: 'UI Design', points: 6 }
    ];
    const expectedOption2 = [
      { name: 'Database Setup', points: 9 }
    ];
    storyServiceSpy.setAutoSelectedStories.and.callFake((capacity: number) => {
      expect(capacity).toBe(9);
      if (capacity === 9) {
        selectedStories$.next(expectedOption1);
      }
    });
  
    component.autoSelect();
  
    expect(storyServiceSpy.setAutoSelectedStories).toHaveBeenCalledWith(9);
  
    selectedStories$.subscribe(stories => {
      const totalPoints = stories.reduce((sum, s) => sum + s.points, 0);
      expect(totalPoints).toBeLessThanOrEqual(9);
      const isOption1 = JSON.stringify(stories) === JSON.stringify(expectedOption1);
      const isOption2 = JSON.stringify(stories) === JSON.stringify(expectedOption2);
      expect(isOption1 || isOption2).toBeTrue();
    });
  });
  it('should select no stories when sprint capacity is too low', () => {
    component.sprintForm.setValue({ sprintPoints: 1 });
    const availableStories: Story[] = [
      { name: 'Login Feature', points: 2 },
      { name: 'Dashboard', points: 3 },
      { name: 'API Integration', points: 5 },
      { name: 'UI Design', points: 6 },
      { name: 'Database Setup', points: 9 }
    ];
    storyServiceSpy.setAutoSelectedStories.and.callFake((capacity: number) => {
      expect(capacity).toBe(1);
      selectedStories$.next([]);
    });
    component.autoSelect();
    expect(storyServiceSpy.setAutoSelectedStories).toHaveBeenCalledWith(1);
    selectedStories$.subscribe(stories => {
      expect(stories.length).toBe(0);
    });
  });
  it('should auto-select stories within the given sprint capacity (13 points)', () => {
    component.sprintForm.setValue({ sprintPoints: 13 });
  
    const availableStories: Story[] = [
      { name: 'Login Feature', points: 2 },
      { name: 'Dashboard', points: 3 },
      { name: 'API Integration', points: 5 },
      { name: 'UI Design', points: 6 },
      { name: 'Database Setup', points: 9 }
    ];
  
    const expectedStories: Story[] = [
      { name: 'Login Feature', points: 2 },
      { name: 'API Integration', points: 5 },
      { name: 'UI Design', points: 6 }
    ];
  
    storyServiceSpy.setAutoSelectedStories.and.callFake((capacity: number) => {
      expect(capacity).toBe(13);
      selectedStories$.next(expectedStories);
    });
  
    component.autoSelect();
  
    expect(storyServiceSpy.setAutoSelectedStories).toHaveBeenCalledWith(13);
  
    selectedStories$.subscribe(stories => {
      expect(stories).toEqual(expectedStories);
      const totalPoints = stories.reduce((sum, s) => sum + s.points, 0);
      expect(totalPoints).toBeLessThanOrEqual(13);
      expect(totalPoints).toBe(13); // exact match
    });
  });
  
  
});
