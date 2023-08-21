import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/models/employee.model';
import { EmployeeStateService } from '../employee-state.service';
import { EmployeeService } from 'src/service/employee.service';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  selectedEmployee: any;

  constructor(
    private route: ActivatedRoute, 
    private employeeService: EmployeeService,
    private employeeStateService: EmployeeStateService
    )
  
  { }

  ngOnInit(): void {
    this.employeeStateService.employee$.subscribe((employee: any) => {
      this.selectedEmployee = employee;
    });
  }

  onValidateButtonClick(): void {
    // Verifica se o funcionário já está validado
    if (this.selectedEmployee?.status !== 'Validado') {
      // Se não estiver validado, valida o funcionário
      this.validateEmployee(true);
    } else {
      alert('Este funcionário já foi validado.');
    }
  }

  validateEmployee(isValid: boolean): void {
    if (this.selectedEmployee && this.selectedEmployee.id !== undefined) {
      const status = isValid ? 'Validado' : 'Não validado';
      this.employeeService.updateEmployeeStatus(this.selectedEmployee.id, status).subscribe(updatedEmployee => {
        this.selectedEmployee = updatedEmployee;
        alert('Status atualizado com sucesso!');
      });
    }
  }
}