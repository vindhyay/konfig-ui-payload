import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'finlevit-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor() {}

  @Input() header: string = '';
  @Input() footer: string = '';

  ngOnInit() {}
}
