import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Etablishment } from '../../../shared/interfaces/etablishment.type';
import { EtablishmentService } from '../../../shared/services/etablishment.service';
import { RoleEnum } from '../../../shared/enumarations/role.enum';
//others
import { Helper } from '../../../shared/helper';

@Component({
  selector: 'app-etablishment-add',
  templateUrl: './etablishment-add.component.html',
  styleUrls: ['./etablishment-add.component.css']
})
export class EtablishmentAddComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  rolesEnum = RoleEnum;
  @Input() etablishment: Etablishment;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private etablishmentService: EtablishmentService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    if(this.action === 'create'){
      this.etablishment = {
        email: '',
        name: '',
        address: "",
        city: "",
        country: "",
        logo: "",
        phones: [],
        url: ''
      }

      this.validateForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [null, [Validators.email, Validators.required]],
        address: [null, [Validators.required]],
        city: [null, [Validators.required, Validators.minLength(3)]],
        country: [null, [Validators.required]],
        url: [null, [Validators.required]],
        phones: [[], [Validators.required]]
      });
    }else{
      this.validateForm = this.fb.group({
        name: [this.action == 'edit' ? this.etablishment.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [this.action == 'edit' ? this.etablishment.email : null, [Validators.email, Validators.required]],
        address: [this.action == 'edit' ? this.etablishment.address : null, [Validators.required]],
        city: [this.action == 'edit' ? this.etablishment.city : null, [Validators.required, Validators.minLength(3)]],
        country: [this.action == 'edit' ? this.etablishment.country : [Validators.required]],
        url: [this.action == 'edit' ? this.etablishment.logo : true, [Validators.required]],
        phones: [[], [Validators.required]]
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format etablishment
    this.etablishment.name = this.validateForm.value.name; 
    this.etablishment.email = this.validateForm.value.email;
    this.etablishment.address = this.validateForm.value.address;
    this.etablishment.city = this.validateForm.value.city;
    this.etablishment.country = this.validateForm.value.country;
    this.etablishment.phones = this.validateForm.value.phones;

    this.isLoading = true;
    if(this.action === 'create'){
      this.etablishmentService.create(this.etablishment)
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
      this.etablishmentService.patch(this.etablishment)
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

  closeModal(){
    this.modal.destroy();
  }

}
