import { Component, OnInit, Renderer2 } from '@angular/core';

export const ModulesList = [
  {
    label: 'User',
    children: [
      {
        label: 'User 1',
        children: [
          {
            label: 'User 5',
          },
          {
            label: 'User 6',
          },
          {
            label: 'User 7',
          },
        ],
      },
      {
        label: 'User 2',
        children: [
          {
            label: 'User 8',
          },
          {
            label: 'User 9',
          },
          {
            label: 'User 10',
          },
        ],
      },
      {
        label: 'User 3',
      },
      {
        label: 'User 4',
      },
    ],
  },
  {
    label: 'Management',
    children: [
      {
        label: 'Management 1',
        children: [
          {
            label: 'Management 2',
          },
          {
            label: 'Management 3',
          },
          {
            label: 'Management 4',
          },
        ],
      },
    ],
  },
  {
    label: 'Admin',
    children: [
      {
        label: 'Admin 1',
      },
      {
        label: 'Admin 2',
      },
      {
        label: 'Admin 3',
      },
      {
        label: 'Admin 4',
      },
    ],
  },
];

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  modulesList: any[] = [];
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger: any;

  constructor(private ren: Renderer2) {
    this.modulesList = [
      {
        label: 'Goals',
        children: [
          {
            label: 'This Year',
          },
          {
            label: '3 to 5 Year',
          },
          {
            label: 'Twelve Week Year',
          },
        ],
      },
      {
        label: 'Twelve Week Year',
        children: [
          {
            label: 'Current',
          },
          {
            label: 'Previous',
          }
        ],
      },
    ];
  }

  ngOnInit(): void {}

  menuenter() {
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger: any, button: any) {
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80);
  }

  menu2enter() {
    this.isMatMenu2Open = true;
  }

  menu2Leave(trigger1: any, trigger2: any, button: any) {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        trigger1.closeMenu();
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100);
  }

  buttonEnter(trigger: any) {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger != trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu();
        this.ren.removeClass(
          trigger.menu.items.first['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          trigger.menu.items.first['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
        this.ren.removeClass(
          trigger.menu.items.first['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          trigger.menu.items.first['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger: any, button: any) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      }
      if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }
}
