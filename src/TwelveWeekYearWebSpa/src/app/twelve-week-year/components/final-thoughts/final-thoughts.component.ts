import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-final-thoughts',
  templateUrl: './final-thoughts.component.html',
  styleUrls: ['./final-thoughts.component.scss'],
})
export class FinalThoughtsComponent implements OnInit {
  commentsForm!: FormGroup;
  constructor() {
    this.commentsForm = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit(f: FormGroupDirective) {
    this.commentsForm.reset();
    f.resetForm();
  }
}
