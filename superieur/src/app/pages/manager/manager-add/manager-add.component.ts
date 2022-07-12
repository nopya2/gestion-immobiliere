import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Manager } from '../../../shared/interfaces/manager.type';
import { Employee } from '@app/shared/interfaces/employee.type';
import { RoleEnum } from '../../../shared/enumerations/role.enum';
import { ManagerService } from '../../../shared/services/manager.service';
import { EmployeeService } from '@app/shared/services/employee.service';
//others
import { Helper } from '../../../shared/helper';

@Component({
  selector: 'app-manager-add',
  templateUrl: './manager-add.component.html',
  styleUrls: ['./manager-add.component.css']
})
export class ManagerAddComponent implements OnInit {

  keys = Object.keys;
  isLoading: Boolean = false;
  rolesEnum = RoleEnum;
  @Input() manager: Manager = {
    employee: null
  };
  @Input() action: string;
  employees: Employee[] = [];
  selectableEmployees: any[] = [];
  validateForm: FormGroup;
  managers: Manager[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private managerService: ManagerService,
    private notification: NzNotificationService,
    private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      employee: [null, [Validators.required]]
    });
    this.getManagers();
  }

  getManagers(){
    this.managerService.getAll({pagination: false})
      .subscribe((res: Manager) => {
        this.managers = res['hydra:member'];

        this.getEmployees();
      }, error => {
        this.notification.error("Echec", "Erreur lors du chargement des managers!");
      })
  }

  getEmployees(){
    this.employeeService.getAll({pagination: false, role: 5})
      .subscribe((res: Employee) => {
        this.employees = res['hydra:member']
          .filter((e: Employee) => {
            let index = this.managers.findIndex(x => x.employee.id === e.id);
            if(index !== -1){
              return false;
            }

            return true;
          });
      }, error => {
        this.notification.error("Echec", "Erreur lors du chargement des employés!");
      })
  }
  

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.isLoading = true;
    
    this.manager.employee = this.validateForm.value.employee;

    if(this.action === 'create'){
      this.managerService.create(this.manager)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Elément ajouté avec succè!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          console.log(error);
          // this.notification.error("Echec création", "Login ou mot de passse invalide!");
        });
    }else{
      this.managerService.patch(this.manager)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Informations enregistrées!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          console.log(error);
          this.notification.error("Echec", "Erreur lors de l'enregistrement des informations!");
        });
    }
  }


  closeModal(){
    this.modal.destroy();
  }

}
