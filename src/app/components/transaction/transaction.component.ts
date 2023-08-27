import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../models/transaction.model';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  // Parámetro de entrada
  @Input() transaction!: Transaction;
  // Evento de salida
  @Output() removeTransactionEvent = new EventEmitter<string>();

  dateStyles: Record<string, string> = {
    'margin-top': '5px',
  };

  // Función ejecutada al montar el componente
  ngOnInit() {
    this.dateStyles['border-bottom'] =
      this.transaction?.type === 'expense'
        ? '2px outset hotpink'
        : '2px outset turquoise';
  }

  removeTransaction() {
    // Emite el evento removeTransacionEvent al componente padre
    // enviando el id de la transacción
    this.removeTransactionEvent.emit(this.transaction.id);
  }
}

