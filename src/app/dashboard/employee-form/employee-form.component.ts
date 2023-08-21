import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { EmployeeService } from 'src/service/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
    ) {}

    // armazena a lista de skills que vem da api
    skillsOptions: string[] = [];


  ngOnInit(): void {
    this.employeeService.getSkillsOptions().subscribe((skills: string[]) => {
      this.skillsOptions = skills;
  });
      this.registroForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
        phone: ['', Validators.pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/)],
        skills: this.fb.array([], [Validators.required, this.skillsValidator])
      });
  }

  skillsList() {
    this.employeeService.getSkillsOptions
  }

  skillsValidator(control: any): {[key: string]: boolean} | null {
    const selectedOptions = control.value;
    if(selectedOptions.length >= 1 && selectedOptions.length<= 3) {
      return null
    } else {
      return {'invalidLength' : true}
    }
  }

  onSkillChange(event: MatCheckboxChange) {
    const skillsFormArray = this.registroForm.controls['skills'] as FormArray;
  
    if (event.checked) {
        skillsFormArray.push(new FormControl(event.source.value));
    } else {
        const index = skillsFormArray.controls.findIndex(control => control.value === event.source.value);
        skillsFormArray.removeAt(index);
    }
}

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      
      this.employeeService.createEmployee(formData).subscribe(
        response => {
          alert('Funcionário registrado com sucesso!');
        },
        error => {
          alert('Ocorreu um erro ao registrar o funcionário.');
        }
      );
    } else {
      alert('Por favor, corrija os erros no formulário.');
    }
  }

  maskCPF(value: string): string {
    let newValue = value.replace(/\D/g, '');
    if (newValue.length <= 3) {
      return newValue;
    }
    if (newValue.length <= 6) {
      return `${newValue.substring(0, 3)}.${newValue.substring(3)}`;
    }
    if (newValue.length <= 9) {
      return `${newValue.substring(0, 3)}.${newValue.substring(3, 3)}.${newValue.substring(6)}`;
    }
    return `${newValue.substring(0, 3)}.${newValue.substring(3, 3)}.${newValue.substring(6, 3)}-${newValue.substring(9, 2)}`;
  }
  
  maskPhone(value: string): string {
    let newValue = value.replace(/\D/g, '');
    if (newValue.length <= 2) {
      return `(${newValue}`;
    }
    if (newValue.length <= 6) {
      return `(${newValue.substring(0, 2)}) ${newValue.substring(2)}`;
    }
    return `(${newValue.substring(0, 2)}) ${newValue.substring(2, 5)}-${newValue.substring(7, 4)}`;
  }
  
  onCPFInput(event: any) {
    event.target.value = this.maskCPF(event.target.value);
  }
  
  onPhoneInput(event: any) {
    event.target.value = this.maskPhone(event.target.value);
  }
  
}
