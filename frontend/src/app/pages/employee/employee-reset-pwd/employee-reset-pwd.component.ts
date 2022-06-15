import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Employee } from '../../../shared/interfaces/employee.type';
//services
import { EmployeeService } from '../../../shared/services/employee.service';

@Component({
  selector: 'app-employee-reset-pwd',
  templateUrl: './employee-reset-pwd.component.html',
  styleUrls: ['./employee-reset-pwd.component.css']
})
export class EmployeeResetPwdComponent implements OnInit {

  @Input() employee: Employee;
  validateForm: FormGroup;
  isLoading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private employeeService: EmployeeService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  closeModal(){
    this.modal.destroy();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.employee.password = this.validateForm.value.password;
    this.isLoading = true;
    this.employeeService.patch(this.employee)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Mot de passe réinitialisé!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          console.log(error);
          this.notification.error("Echec", "Erreur lors de la réinitialisation du mot de passe!");
        });
  }

}
