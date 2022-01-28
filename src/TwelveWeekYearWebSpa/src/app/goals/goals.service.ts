import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Goal, GoalTypes } from './models/goal';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  data: Goal[] = [
    {
      description: 'Do Stuff',
      id: 'f93286f2-0d8b-4316-b9c3-50a0b52eb834',
      type: GoalTypes.ThisYear,
      tasks: []
    },
    {
      description: 'Do more stuff',
      id: '80a1d50a-eee2-4e33-9ea8-a370aa1fd571',
      type: GoalTypes.ThisYear,
      tasks: []
    },
    {
      description: 'Other stuff',
      id: '96fb1d2f-badb-4cef-b3f6-023f8663b251',
      type: GoalTypes.ThisYear,
      tasks: []
    },
    {
      description: '3 to 5 Year 1',
      id: 'dcccb72b-5a96-40c4-bd32-31d3723fcaeb',
      type: GoalTypes.ThreeToFiveYear,
      tasks: []
    },
    {
      description: '3 to 5 Year 2',
      id: '3fcfcc15-d425-426d-a597-feb430f4cb8c',
      type: GoalTypes.ThreeToFiveYear,
      tasks: []
    },
    {
      description: '3 to 5 Year 3',
      id: '1fbdf4e4-4b34-40f7-822f-b70853af57a0',
      type: GoalTypes.ThreeToFiveYear,
      tasks: []
    },
    {
      description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews',
      id: 'c77ef4fd-1209-4366-9d75-235c32e77e0a',
      type: GoalTypes.TwelveWeekYear,
      tasks: [
        {
          description: 'Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition',
          subTasks: []
        },
        {
          description: 'Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
          subTasks: [
            {
              description: 'Cross-media Information',
            },
            {
              description: 'Real-time Schemas'
            },
            {
              description: 'Clicks-and-mortar'
            },
            {
              description: 'Functional Solutions'
            }
          ]
        },
        {
          description: 'Bring to the table win-win survival strategies to ensure proactive domination',
          subTasks: []
        }
      ]
    },
    {
      description: 'At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution',
      id: '80f1a912-a1f7-4a3f-bd14-e283fa4f2915',
      type: GoalTypes.TwelveWeekYear,
      tasks: [
        {
          description: 'User generated content in real-time will have multiple touchpoints for offshoring.',
          subTasks: []
        },
        {
          description: 'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.',
          subTasks: []
        },
        {
          description: 'Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.',
          subTasks: [
            {
              description: 'Synergize Resources'
            },
            {
              description: 'Dynamically Innovate'
            },
            {
              description: 'Web Services'
            }
          ]
        }
      ]
    },
    {
      description: 'Podcasting operational change management inside of workflows to establish a framework',
      id: '6d8c8767-eb9d-4718-9b15-c13ea1e2bb63',
      type: GoalTypes.TwelveWeekYear,
      tasks: [
        {
          description: 'Taking seamless key performance indicators offline to maximise the long tail.',
          subTasks: [
            {
              description: 'Podcasting',
            },
            {
              description: 'Cross-media'
            }
          ]
        },
        {
          description: 'Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.',
          subTasks: []
        },
        {
          description: 'Collaboratively administrate empowered markets via plug-and-play networks.',
          subTasks: []
        }
      ]
    }
  ];

  private _goals$ = new BehaviorSubject<Goal[]>(this.data);

  constructor() {
  }

  getGoals(goalType: GoalTypes): Observable<Goal[]> {
    console.log({goalType});
    return this._goals$.asObservable()
      .pipe(map(data => data.filter(workorder => workorder.type === goalType) ));
  }

  setGoals(goal: Goal[]) {
    this._goals$.next(goal);
  }

  addGoal(description: string, goalType: GoalTypes): void {
    let goal: Goal = {
      id: uuidv4(),
      description,
      type: goalType,
      tasks: []
    };

    this.data.push(goal);

    this.setGoals(this.data);
  }
}
