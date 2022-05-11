import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  styles: [`
        :host ::ng-deep .p-password input {
            width: 25rem
        }
    `]
})
export class RegisterComponent implements OnInit {

  public value4: string
  constructor() { }

  ngOnInit(): void {
  }

}
