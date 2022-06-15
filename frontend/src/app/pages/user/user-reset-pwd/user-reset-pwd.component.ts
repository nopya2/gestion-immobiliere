import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { User } from '../../../shared/interfaces/user.type';
//services
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-reset-pwd',
  templateUrl: './user-reset-pwd.component.html',
  styleUrls: ['./user-reset-pwd.component.css']
})
export class UserResetPwdComponent implements OnInit {

  @Input() user: User;
  validateForm: FormGroup;
  isLoading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
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

    this.user.password = this.validateForm.value.password;
    this.isLoading = true;
    this.userService.patch(this.user)
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
