import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalsService } from '../goals.service';
import { Goal } from '../models/goal';

@Component({
  selector: 'app-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss']
})
export class GoalsGridComponent implements OnInit {
  data$!: Observable<Goal[]>;

  constructor(private service: GoalsService) { 
  }

  ngOnInit(): void {
    this.data$ = this.service.getGoals();
  }
}
