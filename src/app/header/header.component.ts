import { Component } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['a{cursor: pointer}']
})

export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService,
  ) { }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }
}
