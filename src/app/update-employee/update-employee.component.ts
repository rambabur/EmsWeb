import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employee : Employee = new Employee();
  id : number = 0;
  constructor(private employeeService : EmployeeService, 
    private router : ActivatedRoute,
    private route : Router) { }

  ngOnInit(): void {
     this.id = this.router.snapshot.params['id'];
     this.employeeService.getEmployeeById(this.id).subscribe(data  => { 
      this.employee = data; 
      console.log("Loading getEmployee by id: "+ this.employee );
    }, 
     error => console.log(error));
  
  }

  onSubmit(){
    console.log("Update submitted=" + this.employee);
    this.employeeService.updateEmployee(this.id, this.employee).subscribe( data => 
      {
         this.goToEmployeeList();
      }, error => console.log(error));
  }

  goToEmployeeList() {
    this.route.navigate(['/employees']);
  }
 
}
