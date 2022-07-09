import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Module, Permission } from '@app/shared/interfaces/global.type';
//services
import { ModuleService } from '@app/shared/services/module.service';
import { PermissionService } from '@app/shared/services/permission.service';

@Component({
  selector: 'app-module-modal',
  templateUrl: './module-modal.component.html',
  styleUrls: ['./module-modal.component.css']
})
export class ModuleModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() module: Module;
  @Input() action: string;
  permissions: Permission[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private moduleService: ModuleService,
    private notification: NzNotificationService,
    private permissionService: PermissionService) {}

  ngOnInit(): void {
    this.getPermissions();
    this.initForm();
  }

  getPermissions(){
    this.permissionService.getAll({
      pagination: false,
      "order[id]": 'asc',
    })
      .subscribe((res) => {
        this.permissions = res['hydra:member'];
      }, error => {
        this.notification.error("Erreur", "Erreur lors du chargement des permissions!")
      })
  }

  initForm(){
    if(this.action === 'create'){
      this.module = {
        name: '',
        slug: '',
        description: '',
        permissions: []
      }

      this.validateForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        slug: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [''],
      });
    }else{
      this.validateForm = this.fb.group({
        name: [this.action == 'edit' ? this.module.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        slug: [this.action == 'edit' ? this.module.slug : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [this.action == 'edit' ? this.module.description : null]
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format module
    this.module.name = this.validateForm.value.name; 
    this.module.slug = this.validateForm.value.slug;
    this.module.description = this.validateForm.value.description;

    this.isLoading = true;
    if(this.action === 'create'){
      this.moduleService.create(this.module)
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
      this.moduleService.update(this.module)
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

  checkPermission(event){
    console.log(event);
    this.module.permissions = [...event];
  }

  isChecked(permission){
    let index = this.module.permissions.findIndex(x => x.id === permission.id);
    if(index !== -1)
      return true;

    return false;
  }

}
