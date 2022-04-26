import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  value19: number = 3;
  price: number = 100;
  constructor() { }

  ngOnInit(): void {
  }

}
