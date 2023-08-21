import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model'; // Supondo que você tenha um modelo chamado Employee

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee$: any;
  setSelectedEmployee(employee: Employee) {
    throw new Error('Method not implemented.');
  }
  getEmployeeByName(name: string) {
    throw new Error('Method not implemented.');
  }

  private readonly API_URL = 'http://localhost:3000/employee';

  constructor(private httpClient: HttpClient) { }

  // Método para pegar todos os employees
  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.API_URL);
  }

  // Método para criar um novo employee
  createEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.API_URL, employee);
  }

  // Método para atualizar o status de um employee
  updateEmployeeStatus(id: number, status: string): Observable<Employee> {
    return this.httpClient.patch<Employee>(`${this.API_URL}/${id}/status`, { status });
  }

  // Método para buscar lista de skills da API para o formulario de registro
  getSkillsOptions(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:3000/skills');
}
  // Método para buscar um employee by id
  getEmployeeById(id: number) : Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.API_URL}/${id}`);
  } 

}
