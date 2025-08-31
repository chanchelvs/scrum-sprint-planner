
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryService } from '../../../services/story.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sprint-calculator',
  templateUrl: './sprint-calculator.component.html',
  styleUrls: ['./sprint-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class SprintCalculatorComponent implements OnInit {

  sprintForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storyService: StoryService
  ) {
    this.sprintForm = this.fb.group({
      sprintPoints: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {}

  autoSelect() {
    if (this.sprintForm.valid) {
      this.storyService.setAutoSelectedStories(this.sprintForm.value.sprintPoints);
    }
  }

  clearStories() {
    this.storyService.clearStories();
    this.storyService.clearSelectedStories();
    this.sprintForm.reset();
  }

  clearSelectedStories() {
    this.storyService.clearSelectedStories();
  }
}
