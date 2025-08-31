import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StoryService } from '../../../services/story.service';
import { Story } from '../../../models/story.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-story-listing',
  templateUrl: './story-listing.component.html',
  styleUrls: ['./story-listing.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class StoryListingComponent implements OnInit {
  storyList: Story[] = [];

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
    this.storyService.getStories().subscribe(item => {
      if(item) {
        this.storyList = item;
      }
    })
    }

}
