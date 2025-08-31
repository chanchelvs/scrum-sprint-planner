import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private stories = new BehaviorSubject<Story[]>([]);
  private selectedStories = new BehaviorSubject<Story[]>([]);

  setStories(newStory: Story) {
    const availableStories = this.stories.value;
    this.stories.next([...availableStories, newStory]);
  }
  getStories() {
    return this.stories.asObservable();
  }

  getAllStories() {
    return this.stories.value;
  }

  setAutoSelectedStories(sprintPoints: number) {
    const stories = [...this.stories.value].sort((a, b) => b.points - a.points); // largest-first
    const selected: Story[] = [];
    let sum = 0;
    for (const s of stories) {
      if (sum + s.points <= sprintPoints) {
        selected.push(s);
        sum += s.points;
      }
    }
    // display ascending if you want
    selected.sort((a, b) => a.points - b.points);
    this.selectedStories.next(selected);
  }


  getAutoSelectdStories() {
    return this.selectedStories.asObservable();
  }

  clearStories() {
    this.stories.next([]);
  }
  clearSelectedStories() {
    this.selectedStories.next([]);
  }
}
