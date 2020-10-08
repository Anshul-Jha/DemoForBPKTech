import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employees.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {

  public employees: Employee[];
  public empFormGroup: FormGroup;
  public model: Employee = new Employee();
  public savingNow = false;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) {
    this.getEmployees();
  }

  ngOnInit() {
    this.model.id = 0;
    this.empFormGroup = this.fb.group({
      FirstName: [null, Validators.compose([Validators.required])],
      LastName: [null, Validators.compose([Validators.required])],
      City: [null, Validators.compose([Validators.required])],
      PhoneNumber: [null, Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
    })
  }
  saveEmployee() {
    this.savingNow = true;
    if (this.model.id > 0) {
      this.http.put<Employee>(this.baseUrl + "api/Employees/" + this.model.id, this.model).subscribe(res => {
        if (res) {
          alert('Record updated successfully.');
          this.empFormGroup.reset();
          this.model = new Employee();
        }
      }, err => alert(err.error), () => {
        this.savingNow = false;
        this.getEmployees();
      })
    }
    else {
      this.http.post<Employee>(this.baseUrl + "api/Employees", this.model).subscribe(res => {
        if (res) {
          alert('Record saved successfully.');
          this.empFormGroup.reset();
          this.model = new Employee();
        }
      }, err => alert(err.error), () => {
        this.savingNow = false;
        this.getEmployees();
      })
    }
  }
  Delete(id) {
    this.http.delete<Employee>(this.baseUrl + "api/Employees/" + id).subscribe(res => {
      if (res) {
        alert('Record deleted successfully.');
      }
    }, err => alert(err.error), () => {
      this.getEmployees();
    })
  }
  GetEmployeeById(id) {
    this.http.get<Employee>(this.baseUrl + 'api/Employees/' + id).subscribe(result => {
      this.model = result;
    }, error => console.error(error));
  }
  getEmployees() {
    this.http.get<Employee[]>(this.baseUrl + 'api/Employees').subscribe(result => {
      this.employees = result;
    }, error => console.error(error));
  }
}


