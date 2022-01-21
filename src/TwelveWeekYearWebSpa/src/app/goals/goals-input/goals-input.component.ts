import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { GoalsService } from '../goals.service';
import { Goal } from '../models/goal';
import {v4 as uuidv4} from 'uuid';

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
    let myuuid = uuidv4();
    const goal: Goal = {
      description: f.value.description,
      id: myuuid
    };
    console.log({f, value: f.value, goal});
    this.service.addGoal(goal);
  }
}
