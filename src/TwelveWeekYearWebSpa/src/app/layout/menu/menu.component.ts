import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { SiteLink } from 'src/app/app.component';
import { DbService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() data: SiteLink[] = [];
  @Input() trigger = 'Trigger';
  @Input() isRootNode = false;
  @Input() node!: SiteLink;

  isLoading = false;
  dataLoaded = false;

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) menuTriggerChild!: MatMenuTrigger;

  constructor(private database: DbService, private readonly viewRef: ViewContainerRef) {}

  ngOnInit(): void {}

  isExpandable(node: string): boolean {
    return this.database.isExpandable(node);
  }

  getData(node: string) {
    if (!this.dataLoaded) {
      this.isLoading = true;
      this.database.getChildren(node).subscribe((d) => {
        this.data = d?.slice() || [];
        this.isLoading = false;
        this.dataLoaded = true;
      });
    }
  }

  getCount(node: string): number {
    let count = this.database.getCount(node);
    return count;
  }

  mouseEnter() {
    console.log('stuff');
    if (this.menuTrigger) {
      this.menuTrigger.openMenu();
    }
  }
  
  mouseEnterChild() {
    console.log('menuTriggerChild');
    if (this.menuTriggerChild) {
      this.menuTriggerChild.openMenu();
    }
  }
}
