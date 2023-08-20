export class Employee {
  id?: number;
  name: string = "";
  email: string = "";
  cpf: string = "";
  phone?: string;
  skills: string[] = [];
  status: string = "";
  validationDate?: Date;
  // ... quaisquer outros campos que você tenha definido
}