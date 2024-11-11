import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  items: MenuItem[] = [];
  ngOnInit() {
    this.items = [
      {
        label: 'الجنسيات',
        routerLink: 'nationality',
      },
      {
        label: 'المناطق',
        routerLink: 'region',
      },
      {
        label: 'المحافظات',
        routerLink: 'city',
      },
      {
        label: 'العائلات',
        routerLink: 'family',
      },
    ];
  }
}
