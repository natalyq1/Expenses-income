import { Component, OnInit } from '@angular/core';
import { Balance } from 'src/app/models/balance.model';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  balance: Balance = {
    amount: 0,
    income: 0,
    expenses: 0,
  };
  transactions: Transaction[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService
      .getTransactions()
      .subscribe((response: Transaction[]) => {
        //console.log(response);
        this.transactions = response;
        //Actualiza el balance
        this.calculateBalance();
      });
  }

  removeTransaction(transactionId: string) {
    this.transactionsService
      .remove(transactionId)
      .subscribe((response: Transaction) => {
        console.log(response);
        //remove a transaction given its id
        this.transactions = this.transactions.filter(
          (transaction) => transaction.id !== transactionId
        );
        //Actualiza el balance
        this.calculateBalance();
      });
  }

  /**
   * Función que recalcula las cantidades del componente Balance
   */
  calculateBalance() {
    let income: number = 0;
    let expenses: number = 0;
    this.transactions.forEach((transaction) => {
      if (transaction.type === 'expense') expenses += transaction.amount;
      if (transaction.type === 'income') income += transaction.amount;
    });
    const amount: number = income - expenses;
    this.balance = { amount, income, expenses };
  }
}
