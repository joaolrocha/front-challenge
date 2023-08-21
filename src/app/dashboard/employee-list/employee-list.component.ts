import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from 'src/service/employee.service';
import { Router } from '@angular/router';
import { EmployeeStateService } from '../employee-state.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {
  dataSource= new MatTableDataSource<Employee>([]);
  displayedColumns: string[] = [
    'id', 'name', 'email', 'cpf', 'phone', 'skills', 'status', 'validationDate'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private router: Router ,
    private employeeStateService: EmployeeStateService ,
    ) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      // Ordem alfabética baseada no nome
      const sortedEmployees = employees.sort((a, b) => a.name.localeCompare(b.name));

      this.dataSource = new MatTableDataSource(sortedEmployees);
      this.dataSource.paginator = this.paginator;
    });
  }

  onRowClicked(employee: Employee) {
    this.employeeStateService.setSelectedEmployee(employee);
    this.router.navigate([`${employee.name}/validar`]);
}
  
}

