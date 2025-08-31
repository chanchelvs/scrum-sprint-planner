import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private stories = new BehaviorSubject<Story[]>([]);
  public selectedStories = new BehaviorSubject<Story[]>([]);

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

 getBestStoryCombination(stories: Story[], sprintPoints: number): Story[] {
  stories.sort((a, b) => a.points - b.points);

  const bestCombination: Story[] = [];
  let bestSum = 0;
  const current: Story[] = [];

  function findBestCombination(index: number, currentSum: number) {
    if (currentSum > sprintPoints) return;

    if (
      currentSum > bestSum ||
      (currentSum === bestSum && isLexSmaller(current, bestCombination))
    ) {
      bestCombination.length = 0;
      bestCombination.push(...current);
      bestSum = currentSum;
    }

    for (let i = index; i < stories.length; i++) {
      current.push(stories[i]);
      findBestCombination(i + 1, currentSum + stories[i].points);
      current.pop();
    }
  }

  function isLexSmaller(a: Story[], b: Story[]): boolean {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i].points < b[i].points) return true;
      if (a[i].points > b[i].points) return false;
    }
    return a.length < b.length;
  }
  
  findBestCombination(0, 0);
  return bestCombination;
}

setAutoSelectedStories(sprintPoints: number): void {
  const stories = [...this.stories.value];
  const bestStories = this.getBestStoryCombination(stories, sprintPoints);
  this.selectedStories.next(bestStories);
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
