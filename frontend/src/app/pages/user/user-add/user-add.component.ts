import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { User } from '../../../shared/interfaces/user.type';
import { UserService } from '../../../shared/services/user.service';
import { RoleEnum } from '../../../shared/enumerations/role.enum';
//others
import { Helper } from '../../../shared/helper';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  rolesEnum = RoleEnum;
  @Input() user: User;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    if(this.action === 'create'){
      this.user = {
        "@id": null,
        username: '',
        email: '',
        enabled: true,
        firstname: '',
        name: '',
        phoneNumber1: '',
        phoneNumber2: '',
        roles: [],
        password: ''
      }

      this.validateForm = this.fb.group({
        username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        firstname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [null, [Validators.email, Validators.required]],
        roles: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        checkPassword: [null, [Validators.required, this.confirmationValidator]],
        phoneNumber1: [null, [Validators.required]],
        phoneNumber2: [null],
        enabled: [true]
      });
    }else{
      this.validateForm = this.fb.group({
        username: [this.action == 'edit' ? this.user.username : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        name: [this.action == 'edit' ? this.user.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        firstname: [this.action == 'edit' ? this.user.firstname : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [this.action == 'edit' ? this.user.email : null, [Validators.email, Validators.required]],
        roles: [this.action == 'edit' ? this.user.roles : null, [Validators.required]],
        phoneNumber1: [this.action == 'edit' ? this.user.phoneNumber1 : null, [Validators.required]],
        phoneNumber2: [this.action == 'edit' ? this.user.phoneNumber2 : null],
        enabled: [this.action == 'edit' ? this.user.enabled : true]
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format user
    this.user.username = this.validateForm.value.username; 
    this.user.name = this.validateForm.value.name;
    this.user.firstname = this.validateForm.value.firstname;
    this.user.email = this.validateForm.value.email;
    this.user.roles = this.validateForm.value.roles;
    if(this.action === 'create'){
      this.user.password = this.validateForm.value.password;
    }
    this.user.phoneNumber1 = Helper.formatPhoneNumber(this.validateForm.value.phoneNumber1);
    this.user.phoneNumber2 = Helper.formatPhoneNumber(this.validateForm.value.phoneNumber2);
    this.user.enabled = this.validateForm.value.enabled;

    this.isLoading = true;
    if(this.action === 'create'){
      this.userService.create(this.user)
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
      this.userService.patch(this.user)
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

}
