import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Goal, GoalTypes, Task } from './models/goal';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  data: Goal[] = [
    {
      description: 'Do Stuff',
      id: 'f93286f2-0d8b-4316-b9c3-50a0b52eb834',
      type: GoalTypes.ThisYear,
      tasks: [],
    },
    {
      description: 'Do more stuff',
      id: '80a1d50a-eee2-4e33-9ea8-a370aa1fd571',
      type: GoalTypes.ThisYear,
      tasks: [],
    },
    {
      description: 'Other stuff',
      id: '96fb1d2f-badb-4cef-b3f6-023f8663b251',
      type: GoalTypes.ThisYear,
      tasks: [],
    },
    {
      description: '3 to 5 Year 1',
      id: 'dcccb72b-5a96-40c4-bd32-31d3723fcaeb',
      type: GoalTypes.ThreeToFiveYear,
      tasks: [],
    },
    {
      description: '3 to 5 Year 2',
      id: '3fcfcc15-d425-426d-a597-feb430f4cb8c',
      type: GoalTypes.ThreeToFiveYear,
      tasks: [],
    },
    {
      description: '3 to 5 Year 3',
      id: '1fbdf4e4-4b34-40f7-822f-b70853af57a0',
      type: GoalTypes.ThreeToFiveYear,
      tasks: [],
    },
    {
      description:
        'Leverage agile frameworks to provide a robust synopsis for high level overviews',
      id: 'c77ef4fd-1209-4366-9d75-235c32e77e0a',
      type: GoalTypes.TwelveWeekYear,
      tasks: [
        {
          id: '96eb454a-f1ed-45eb-b668-f5c968808ad9',
          description:
            'Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition',
          subTasks: [],
        },
        {
          id: '4f3e29bb-02d8-4b4a-abaa-3f9593810b7d',
          description:
            'Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
          subTasks: [
            {
              id: 'f4d0fc74-24f6-485e-8e32-01dc90efd966',
              description: 'Cross-media Information',
            },
            {
              id: '4ae3321d-ae95-44b0-9d06-970e879ab720',
              description: 'Real-time Schemas',
            },
            {
              id: '9c4bbf1d-a101-47a5-bdc8-b11ea499232a',
              description: 'Clicks-and-mortar',
            },
            {
              id: 'f0413ea7-479c-4e15-b3f0-466d71f57909',
              description: 'Functional Solutions',
            },
          ],
        },
        {
          id: '1f63e95d-5289-4ef7-a319-76030dac585a',
          description:
            'Bring to the table win-win survival strategies to ensure proactive domination',
          subTasks: [],
        },
      ],
    },
    {
      description:
        'At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution',
      id: '80f1a912-a1f7-4a3f-bd14-e283fa4f2915',
      type: GoalTypes.TwelveWeekYear,
      tasks: [
        {
          id: '8dbef7aa-2957-4124-8901-2db54f9597e6',
          description:
            'User generated content in real-time will have multiple touchpoints for offshoring.',
          subTasks: [],
        },
        {
          id: 'f3039a38-1184-4b34-9873-c4c0b6c28425',
          description:
            'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.',
          subTasks: [],
        },
        {
          id: '0e7c52bc-5360-47b7-a957-218ef6f0d9ca',
          description:
            'Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.',
          subTasks: [
            {
              id: '994e37b6-62b0-4b40-a730-ea6fb4bf3454',
              description: 'Synergize Resources',
            },
            {
              id: 'da091261-735d-43db-95fa-5f1688a58775',
              description: 'Dynamically Innovate',
            },
            {
              id: 'e3e6753d-e439-491c-ba2c-33d1736af714',
              description: 'Web Services',
            },
          ],
        },
      ],
    },
    {
      description:
        'Podcasting operational change management inside of workflows to establish a framework',
      id: '6d8c8767-eb9d-4718-9b15-c13ea1e2bb63',
      type: GoalTypes.TwelveWeekYear,
      tasks: [
        {
          id: 'a7917f56-0a64-422f-9eae-3fddde2d7a3c',
          description:
            'Taking seamless key performance indicators offline to maximise the long tail.',
          subTasks: [
            {
              id: '6d95a4a6-47d6-49cf-b3ca-f5f3e50305fa',
              description: 'Podcasting',
            },
            {
              id: '5d09c331-d326-4445-8a18-d5ef3a148ba2',
              description: 'Cross-media',
            },
          ],
        },
        {
          id: 'aaa58ef5-33fb-465c-9f1e-c40338c889e9',
          description:
            'Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.',
          subTasks: [],
        },
        {
          id: '91a3dc32-5196-4839-a89e-ccc0bbb61d19',
          description:
            'Collaboratively administrate empowered markets via plug-and-play networks.',
          subTasks: [],
        },
      ],
    },
    {
      id: 'a4386b17-bcd8-4890-8348-24d3e2348a8f',
      description:
        'Phosfluorescently engage worldwide methodologies with web-enabled technology',
      type: GoalTypes.TwelveWeekYear,
      tasks: [
        {
          id: '0a91151e-74b0-42c1-911f-3ba1b6f22d88',
          description:
            'Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking',
          subTasks: [
            {
              id: '0cc505d9-89f3-4491-b86e-70710f6de677',
              description: 'Scalable customer service',
            },
            {
              id: '8da12486-09e4-4e06-805f-742e234bae96',
              description: 'Sustainable potentialities',
            },
            {
              id: 'd0822799-be1f-410e-82c2-dc01c58dae67',
              description: 'State of the Art Customer Service',
            },
            {
              id: '89b7dbe8-1d29-40ff-bde6-f083da594c84',
              description: 'Holistically pontificate',
            },
          ],
        },
      ],
    },
    {
      id: '6c9f5b6b-3880-4aaf-94e4-086163dd4820',
      description:
        'Quick sync marketing, illustration what are the expectations radical candor through the lens of',
      type: GoalTypes.TwelveWeekYear,
      tasks: [
        {
          id: '8aa6ec38-0feb-4620-af59-62b8933efc7e',
          description:
            'Big picture marketing computer development html roi feedback team website core competencies.',
          subTasks: [
            {
              id: '57683924-f074-451a-8a9e-80d9e0f6273c',
              description: 'Hammer out',
            },
            {
              id: '3d7a4597-2069-4cc5-9094-d7013b1b8923',
              description: 'Core Competencies',
            },
            {
              id: 'f81704b6-027a-474b-be0e-0b59b8da828b',
              description: 'Quick Sync Marketing',
            },
          ],
        },
        {
          id: '96067b1d-6f47-4ece-8dc7-d835bbdb6ac5',
          description: 'Moving the goalposts bottleneck mice or quick sync.',
          subTasks: [
            {
              id: 'ddf2331d-8ba7-4f6b-8e15-9cac66318075',
              description: 'Goalposts Bottleneck',
            },
            {
              id: '72537dbb-c6f1-48b1-a9fc-f656292a18ef',
              description: 'Diarize This',
            },
            {
              id: 'cdab1778-be9f-44a0-925c-0253daf94b31',
              description: 'Diversify KPIs',
            },
            {
              id: 'bf297cba-eafb-4bd6-a1db-7d19b08bc416',
              description: 'Process Outsourcing',
            },
          ],
        },
      ],
    },
  ];

  private _goals$ = new BehaviorSubject<Goal[]>(this.data);

  constructor() {}

  getGoals(goalType: GoalTypes): Observable<Goal[]> {
    return this._goals$
      .asObservable()
      .pipe(
        map((data) => data.filter((workorder) => workorder.type === goalType))
      );
  }

  setGoals(goal: Goal[]) {
    this._goals$.next(goal);
  }

  addGoal(description: string, goalType: GoalTypes, tasks: Task[] = []): void {
    let goal: Goal = {
      id: uuidv4(),
      description,
      type: goalType,
      tasks: tasks,
    };

    this.data.push(goal);

    this.setGoals(this.data);
  }
}
