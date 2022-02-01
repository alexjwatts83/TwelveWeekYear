import { Component, Input, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Goal } from 'src/app/goals/models';
import { Week } from '../../models';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface GoalNode {
  data: any;
  name: string;
  children?: GoalNode[];
}

/** Flat node with expandable and level information */
interface ExpandableFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-twelve-week-year-goals-treelist',
  templateUrl: './twelve-week-year-goals-treelist.component.html',
  styleUrls: ['./twelve-week-year-goals-treelist.component.scss'],
})
export class TwelveWeekYearGoalsTreelistComponent implements OnInit {
  @Input() goals: Goal[] = [];
  @Input() week!: Week;

  private _transformer = (node: GoalNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExpandableFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
  }

  ngOnInit(): void {
    let data = this.goals.map(x => {
      let goalNode: GoalNode = {
        data: x,
        name: x.description
      }
      let children = x.tasks.map(t => {
        let child: GoalNode = {
          data: t,
          name: t.description
        }

        let grandChildren = t.subTasks.map(st => {
          let grandChild: GoalNode = {
            data: st,
            name: st.description
          }
          return grandChild;
        });

        child.children = grandChildren;

        return child;
      });

      goalNode.children = children;

      return goalNode;
    })
    this.dataSource.data = data;
    // console.log({goals: this.goals, data});
  }

  hasChild = (_: number, node: ExpandableFlatNode) => node.expandable;
}
