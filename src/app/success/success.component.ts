import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  planet;
  timeTaken;
  constructor(
  ) { }

  ngOnInit(): void {
    this.planet = localStorage.getItem('planent');
    this.timeTaken = localStorage.getItem('time');

  }


}
