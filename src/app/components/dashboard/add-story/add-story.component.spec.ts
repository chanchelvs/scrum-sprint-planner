import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddStoryComponent } from './add-story.component';
import { StoryService } from '../../../services/story.service';
import { By } from '@angular/platform-browser';

class MockStoryService {
  private stories: any[] = [];

  setStories(story: any) {
    this.stories.push(story);
  }

  getAllStories() {
    return this.stories;
  }
}

describe('AddStoryComponent', () => {
  let component: AddStoryComponent;
  let fixture: ComponentFixture<AddStoryComponent>;
  let storyService: MockStoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddStoryComponent],
      providers: [{ provide: StoryService, useClass: MockStoryService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddStoryComponent);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService) as unknown as MockStoryService;
    fixture.detectChanges();
  });

  it('should add multiple stories with specific points', () => {
    const storiesToAdd = [
      { name: 'Login Feature', points: 2, description: 'Login Feature' },
      { name: 'Dashboard Feature', points: 3, description: 'Dashboard Feature' },
      { name: 'API Integration', points: 5, description: 'API Integration' },
      { name: 'UI Design', points: 6, description: 'UI Design' },
      { name: 'Database Setup', points: 9, description: 'Database Setup' }
    ];

    storiesToAdd.forEach(story => {
      component.storyForm.setValue({
        name: story.name,
        points: story.points,
        description: story.description
      });
      component.addStory();
    });

    const addedStories = storyService.getAllStories();

    expect(addedStories.length).toBe(5);

    expect(addedStories).toEqual(jasmine.arrayContaining([
      jasmine.objectContaining({ name: 'Login Feature', points: 2 }),
      jasmine.objectContaining({ name: 'Dashboard Feature', points: 3 }),
      jasmine.objectContaining({ name: 'API Integration', points: 5 }),
      jasmine.objectContaining({ name: 'UI Design', points: 6 }),
      jasmine.objectContaining({ name: 'Database Setup', points: 9 }),
    ]));
  });

  it('should not add duplicate story names', () => {
    component.storyForm.setValue({
      name: 'Login Feature',
      points: 2,
      description: 'First story'
    });
    component.addStory();

    component.storyForm.setValue({
      name: 'Login Feature',
      points: 5,
      description: 'Duplicate story'
    });
    component.addStory();

    const addedStories = storyService.getAllStories();
    expect(addedStories.length).toBe(1);
  });
});
