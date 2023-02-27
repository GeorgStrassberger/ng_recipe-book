import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['a{cursor: pointer}']
})

export class HeaderComponent implements OnInit, OnDestroy {

  isAutheticated: boolean = false;
  private userSub!: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAutheticated = !user ? false : true;
      // this.isAutheticated = !!user; js trick 
      console.log('NotUser:', !user);
      console.log('NotNotUser:', !!user);
    });
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
