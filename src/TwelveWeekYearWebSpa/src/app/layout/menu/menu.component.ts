import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  isLoading = false;
  dataLoaded = false;

  children: Map<string,number> = new Map<string, number>();

  constructor(private database: DbService) {}

  ngOnInit(): void {}

  isExpandable(node: string): boolean {
    return this.database.isExpandable(node);
  }

  getData(node: string) {
    if (!this.dataLoaded) {
      this.isLoading = true;
      this.database.getChildren(node).subscribe((d) => {
        let childs = d?.slice() || [];
        this.data = childs;
        if (!this.children.has(node)) {
          this.children.set(node, childs.length);
        }
        // console.log({node, children: this.children});
        this.isLoading = false;
        this.dataLoaded = true;
      });
    }
  }

  getCount(node: string): number {
    if (!this.children.has(node)) {
      this.getData(node);
    }
    let count = this.children.get(node) ?? -1;
    console.log({node, count});
    return count;
  }

//   getCount(node: string) {
//     if (!this.dataLoaded) {
//       this.isLoading = true;
//       let stuff = this.database.getChildren(node).pipe(
//         tap((nodes) => console.log({ node, nodes })),
//         map((nodes) => {
//           this.isLoading = false;
//           this.dataLoaded = true;
//           return nodes?.length;
//         })
//       );
//       return stuff;
//     }
//   }
}
