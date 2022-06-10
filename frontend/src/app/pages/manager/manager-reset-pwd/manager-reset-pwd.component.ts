import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Manager } from '../../../shared/interfaces/manager.type';
//services
import { ManagerService } from '../../../shared/services/manager.service';

@Component({
  selector: 'app-manager-reset-pwd',
  templateUrl: './manager-reset-pwd.component.html',
  styleUrls: ['./manager-reset-pwd.component.css']
})
export class ManagerResetPwdComponent implements OnInit {

  @Input() manager: Manager;
  validateForm: FormGroup;
  isLoading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private managerService: ManagerService,
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

    this.manager.password = this.validateForm.value.password;
    this.isLoading = true;
    this.managerService.patch(this.manager)
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
