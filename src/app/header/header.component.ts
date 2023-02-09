import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent{
  collapsed = true;
  @Output() outView = new EventEmitter<boolean>();
  isDisplayed: boolean = false;

  showOrHides(){
    this.isDisplayed = !this.isDisplayed;
    this.outView.emit(this.isDisplayed);
  }
}
