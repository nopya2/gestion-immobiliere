import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Manager } from '../../../shared/interfaces/manager.type';
import { ManagerService } from '../../../shared/services/manager.service';
import { RoleEnum } from '../../../shared/enumerations/role.enum';
//others
import { Helper } from '../../../shared/helper';

@Component({
  selector: 'app-manager-add',
  templateUrl: './manager-add.component.html',
  styleUrls: ['./manager-add.component.css']
})
export class ManagerAddComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  rolesEnum = RoleEnum;
  @Input() manager: Manager;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private managerService: ManagerService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    if(this.action === 'create'){
      this.manager = {
        "@id": null,
        username: '',
        email: '',
        enabled: true,
        firstname: '',
        name: '',
        phoneNumber1: '',
        phoneNumber2: '',
        roles: ["ROLE_RES_ETA"],
        password: ''
      }

      this.validateForm = this.fb.group({
        username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        firstname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [null, [Validators.email, Validators.required]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        checkPassword: [null, [Validators.required, this.confirmationValidator]],
        phoneNumber1: [null, [Validators.required]],
        phoneNumber2: [null],
        enabled: [true]
      });
    }else{
      this.validateForm = this.fb.group({
        username: [this.action == 'edit' ? this.manager.username : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        name: [this.action == 'edit' ? this.manager.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        firstname: [this.action == 'edit' ? this.manager.firstname : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [this.action == 'edit' ? this.manager.email : null, [Validators.email, Validators.required]],
        phoneNumber1: [this.action == 'edit' ? this.manager.phoneNumber1 : null, [Validators.required]],
        phoneNumber2: [this.action == 'edit' ? this.manager.phoneNumber2 : null],
        enabled: [this.action == 'edit' ? this.manager.enabled : true]
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format manager
    this.manager.username = this.validateForm.value.username; 
    this.manager.name = this.validateForm.value.name;
    this.manager.firstname = this.validateForm.value.firstname;
    this.manager.email = this.validateForm.value.email;
    if(this.action === 'create'){
      this.manager.password = this.validateForm.value.password;
    }
    this.manager.phoneNumber1 = Helper.formatPhoneNumber(this.validateForm.value.phoneNumber1);
    this.manager.phoneNumber2 = Helper.formatPhoneNumber(this.validateForm.value.phoneNumber2);
    this.manager.enabled = this.validateForm.value.enabled;

    this.isLoading = true;
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
