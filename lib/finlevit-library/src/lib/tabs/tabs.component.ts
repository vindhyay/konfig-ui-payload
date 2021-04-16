import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'finlevit-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  constructor() {}
  @Input() items: MenuItem[] = [];
  @Input() activeItem: MenuItem = {} as MenuItem;
  ngOnInit(): void {}
}
