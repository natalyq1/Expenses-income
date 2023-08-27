import { Component, Input } from '@angular/core';
import { Balance } from '../../models/balance.model';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {
  // ! es para decirle que le va allegar un valor
  @Input() balance!: Balance;
}
