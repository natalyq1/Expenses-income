import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  lineChartData: ChartDataset[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartLegend = true;
  lineChartType = 'line';
  selectedDate: Date;

  //Formateo de la fecha
  formatDate(date: Date): string {
    return date.toISOString().slice(0, 10); // Formatear la fecha como "yyyy-MM-dd"
  }

  updateSelectedDate(event: any): void {
    const dateString = event.target.value;
    this.selectedDate = new Date(dateString);
  }
  //Permite acceder al servicio y los datos de las transacciones
  constructor(private transactionsService: TransactionsService) {
    this.selectedDate = new Date(); // Asignación directa del objeto Date
  }

  //Al iniciar
  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe((transactions) => {
      this.updateChartData(transactions);
    });
  }

  filterTransactions(): void {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que agregamos 1
    const day = this.selectedDate.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;

    this.transactionsService
      .getTransactionsByDate(formattedDate)
      .subscribe((transactions) => {
        this.updateChartData(transactions);
      });
  }

  private updateChartData(transactions: Transaction[]): void {
    const incomeData: number[] = [];
    const expenseData: number[] = [];
    //Fecha-eje x
    const labels: string[] = [];

    //Itera sobre cada transaccion para los montos y fechas
    transactions.forEach((transaction) => {
      labels.push(new Date(transaction.date).toLocaleDateString());

      //determina el tipo de transaccion y la agrega
      if (transaction.type === 'income') {
        incomeData.push(transaction.amount);
        expenseData.push(0);
      } else if (transaction.type === 'expense') {
        expenseData.push(transaction.amount);
        incomeData.push(0);
      }
    });
    //asigna los datos a su respectiva label dentro del grafico
    this.lineChartData = [
      { data: incomeData, label: 'Income' },
      { data: expenseData, label: 'Expenses' },
    ];
    this.lineChartLabels = labels;
  }
}
