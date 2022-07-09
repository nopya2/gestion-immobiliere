import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Role, Module, Privilege, Permission } from '@app/shared/interfaces/global.type';

//services
import { RoleService } from '@app/shared/services/role.service';
import { ModuleService } from '@app/shared/services/module.service';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})
export class RoleModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() role: Role;
  @Input() action: string;
  modules: Module[] = [];
  modulesLoading: boolean = true;
  privileges: Privilege[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private roleService: RoleService,
    private notification: NzNotificationService,
    private moduleService: ModuleService) {}

  ngOnInit(): void {
    this.getModules();
    this.initForm();
  }

  getModules(){
    this.modulesLoading = true;
    this.moduleService.getAll({
      pagination: false,
      "order[name]": 'asc',
    })
      .subscribe((res) => {
        this.modulesLoading = false;
        this.modules = res['hydra:member'];
      }, error => {
        this.modulesLoading = false;
        this.notification.error("Erreur", "Erreur lors du chargement des modules!")
      })
  }

  initForm(){
    if(this.action === 'create'){
      this.role = {
        name: '',
        description: '',
        privileges: []
      }

      this.validateForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [''],
      });
    }else{
      this.validateForm = this.fb.group({
        name: [this.action == 'edit' ? this.role.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [this.action == 'edit' ? this.role.description : null]
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format role
    this.role.name = this.validateForm.value.name;
    this.role.description = this.validateForm.value.description;

    this.isLoading = true;
    if(this.action === 'create'){
      this.roleService.create(this.role)
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
      this.roleService.update(this.role)
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

  checkPermission(event: any[], module: Module){
    //On verifie d'abord si ce module existe deja dans ses privileges
    let priviliges = this.role.privileges
      .filter(p => p.module.id !== module.id);

    event.forEach(el => {
      priviliges.push({
        module: module,
        permission: el
      })
    });

    this.role.privileges = [...priviliges]
    console.log(this.role.privileges);
  }

  isChecked(permission: Permission, module: Module){
    let index = this.role.privileges.findIndex(x => x.permission.id === permission.id && x.module.id === module.id);
    if(index !== -1)
      return true;

    return false;
  }

}
