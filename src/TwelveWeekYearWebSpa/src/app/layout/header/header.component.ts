import { Component, Input, OnInit } from '@angular/core';
import { SiteLink } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() links: SiteLink[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
