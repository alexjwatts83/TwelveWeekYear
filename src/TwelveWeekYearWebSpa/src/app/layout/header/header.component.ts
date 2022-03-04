import { Component, Input, OnInit } from '@angular/core';
import { SiteLink } from 'src/app/app.component';
import { DbService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-header-this',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() links: SiteLink[] = []
  initialData: SiteLink[] = [];

  constructor(private database:DbService) { 
    this.initialData = this.database.rootLevelNodes.slice();
  }

  ngOnInit(): void {
  }
}
