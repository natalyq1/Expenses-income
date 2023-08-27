import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ChartDataset, ChartOptions } from 'chart.js';


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

  //Permite acceder al servicio y los datos de las transacciones
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe((transactions) => {
      const incomeData: number[] = [];
      const expenseData: number[] = [];
//Fecha-eje x
      const labels: string[] = [];

      //Itera sobre cada transaccion para los montos y fechas
      transactions.forEach((transaction) => {
        //agrega la fecha
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
    });
  }
}
