import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { GoalsService } from '../goals.service';

@Component({
  selector: 'app-goals-input',
  templateUrl: './goals-input.component.html',
  styleUrls: ['./goals-input.component.scss']
})
export class GoalsInputComponent implements OnInit {
  goalInputForm!: FormGroup;
  constructor(private service: GoalsService) { }

  ngOnInit(): void {
    this.goalInputForm = new FormGroup({
      description: new FormControl('', [ Validators.required ]),
    });
  }

  onSubmit(f: FormGroupDirective) {
    console.log({f, value: f.value});
    this.service.addGoal(f.value.description);
  }
}
