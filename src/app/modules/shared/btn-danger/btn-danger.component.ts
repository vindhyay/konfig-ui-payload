import { Component, OnInit } from '@angular/core';
import {BtnPrimaryComponent} from "../btn-primary/btn-primary.component";

@Component({
  selector: 'app-btn-danger',
  templateUrl: './btn-danger.component.html',
  styleUrls: ['./btn-danger.component.scss']
})
export class BtnDangerComponent extends BtnPrimaryComponent implements OnInit {

  ngOnInit(): void {
  }

}
