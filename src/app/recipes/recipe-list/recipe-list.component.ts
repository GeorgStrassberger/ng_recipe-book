import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../shared/resipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Wiener Schnitzel',
                'mit Preiselbeeren und Pommes',
            'https://pixabay.com/get/g6d13a49d339241d268e259c21e608b574d365fc3750d48156b633ec4dadf7d68b9a28dff65217efd53b87177ea413a75b70ce8914d3d2602578d5652b3fafc0e3665e0c9976fef7943a3ca60211d091e_1280.jpg'
              ),
    new Recipe( 'Chilli Con Carne',
  'nach Ungarischer Art, sehr scharf, ',
      'https://pixabay.com/get/gb5c6c81df8f5c3ab7b5bf2be59d140a6c92f47434179ebcf05a1029329b8cf2dfb5f97daae2f05a18b047e829e0db65e3d9cdc77000160b399084a6b9702b154b65f451dc180a5c8da4894e5dde81711_1280.jpg'
    ),
  ];

  constructor(){ }

  ngOnInit() {
  }


}
