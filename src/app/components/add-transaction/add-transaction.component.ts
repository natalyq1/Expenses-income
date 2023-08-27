import { Transaction } from 'src/app/models/transaction.model';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  addTransactionForm!: FormGroup;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const date: string = new Date().toISOString().split('T')[0];
    //const date: string = formatDate(new Date(2022, 7, 30), 'yyyy-MM-dd', 'en')

    //Hook que se ejecuta al montar el componente en el DOM
    this.addTransactionForm = new FormGroup({
      amount: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      type: new FormControl('expense', Validators.required),
      category: new FormControl('food', Validators.required),
      date: new FormControl(date, Validators.required),
    });
  }

  onSubmit() {
    // Verifica si el form es válido
    if (this.addTransactionForm.valid) {
      //Obtiene el objeto Transaction del form
      const newTransaction: Transaction = this.addTransactionForm.value;
      //Usa el servicio para crear una transaccion en el backend
      this.transactionsService
        .create(newTransaction)
        .subscribe((response: Transaction) => {
          //Redirecciona al home
          this.router.navigate(['']);
        });
    } else {
      console.error('The form is not valid');
    }
  }
}
