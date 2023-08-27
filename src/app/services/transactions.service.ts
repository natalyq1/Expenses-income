import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  url: string = 'http://localhost:3000/transactions';
  //Servicio agregado con Dependency Injection
  constructor(private httpClient: HttpClient) {}

  public getTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.url);
  }

  //Crear una funcion que dado un Id retorne del be una transaccion
  public getById(transactionId: string): Observable<Transaction> {
    return this.httpClient.get<Transaction>(`${this.url}/${transactionId}`);
  }

  public create(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(this.url, transaction);
  }
  public remove(transactionId: string): Observable<Transaction> {
    //Remove a transaction given its Id
    return this.httpClient.delete<Transaction>(`${this.url}/${transactionId}`);
  }
}
