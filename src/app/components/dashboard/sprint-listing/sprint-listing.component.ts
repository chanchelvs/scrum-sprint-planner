import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Story } from '../../../models/story.model';
import { StoryService } from '../../../services/story.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-sprint-listing',
  templateUrl: './sprint-listing.component.html',
  styleUrls: ['./sprint-listing.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class SprintListingComponent implements OnInit {
  public sprintStoryListing: Story[] = [];
  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
    this.storyService.getAutoSelectdStories().forEach(item => {
      if(item) {
        this.sprintStoryListing = item;
      }
    })
  }

}
