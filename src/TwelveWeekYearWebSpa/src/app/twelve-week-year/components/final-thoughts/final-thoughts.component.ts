import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TaskCommentsService } from '../task-comments/task-comments.service';

@Component({
  selector: 'app-final-thoughts',
  templateUrl: './final-thoughts.component.html',
  styleUrls: ['./final-thoughts.component.scss']
})
export class FinalThoughtsComponent implements OnInit {

  commentsForm!: FormGroup;
  constructor(private service: TaskCommentsService) {
    this.commentsForm = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  onSubmit(f: FormGroupDirective) {
    // this.service.addComment(
    //   this.task.id,
    //   this.week.number,
    //   f.value.comment,
    //   new Date()
    // );
    this.commentsForm.reset();
    f.resetForm();
  }
}
