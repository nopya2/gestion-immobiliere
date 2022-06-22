import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Permission } from '@app/shared/interfaces/global.type';
//services
import { PermissionService } from '@app/shared/services/permission.service';

@Component({
  selector: 'app-permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrls: ['./permission-modal.component.css']
})
export class PermissionModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() permission: Permission;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private permissionService: PermissionService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    if(this.action === 'create'){
      this.permission = {
        name: '',
        slug: ''
      }

      this.validateForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        slug: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      });
    }else{
      this.validateForm = this.fb.group({
        name: [this.action == 'edit' ? this.permission.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        slug: [this.action == 'edit' ? this.permission.slug : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format permission
    this.permission.name = this.validateForm.value.name; 
    this.permission.slug = this.validateForm.value.slug;

    this.isLoading = true;
    if(this.action === 'create'){
      this.permissionService.create(this.permission)
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
      this.permissionService.patch(this.permission)
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
