import { Component, OnInit } from '@angular/core';
import { Goal } from '../models/goal';

@Component({
  selector: 'app-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss']
})
export class GoalsGridComponent implements OnInit {
  data: Goal[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
