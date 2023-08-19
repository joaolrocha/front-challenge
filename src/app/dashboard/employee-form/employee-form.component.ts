import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.registroForm = this.fb.group({
        nome: ['', [Validators.required, Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
        celular: ['', Validators.pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/)],
        skills: ['',[Validators.required, this.skillsValidator]]
      });
  }

  skillsValidator(control: any): {[key: string]: boolean} | null {
    const selectedOptions = control.value;
    if(selectedOptions.length >= 1 && selectedOptions.length<= 3) {
      return null
    } else {
      return {'invalidLength' : true}
    }
  }
}
