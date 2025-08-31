import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddStoryComponent } from './add-story/add-story.component';
import { StoryListingComponent } from './story-listing/story-listing.component';
import { SprintListingComponent } from './sprint-listing/sprint-listing.component';
import { SprintCalculatorComponent } from './sprint-calculator/sprint-calculator.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule,
      AddStoryComponent,
      StoryListingComponent,SprintListingComponent,
      SprintCalculatorComponent

   ],
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
