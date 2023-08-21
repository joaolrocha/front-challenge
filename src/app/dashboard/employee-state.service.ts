import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStateService {
  private employeeSubject = new BehaviorSubject<Employee | null>(null);
  public employee$: Observable<Employee | null> = this.employeeSubject.asObservable();

  setSelectedEmployee(employee: Employee): void {
    this.employeeSubject.next(employee);
  }
}
