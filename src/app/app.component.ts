import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isViewed: boolean = false;
  viewPart(show: boolean){
    this.isViewed = show;
  }

}
