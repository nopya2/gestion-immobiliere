import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Employee } from '../../../shared/interfaces/employee.type';
import { Etablishment } from '../../../shared/interfaces/etablishment.type';
import { Role } from '@app/shared/interfaces/global.type';
//services
import { EmployeeService } from '../../../shared/services/employee.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { RoleService } from '@app/shared/services/role.service';
import { EtablishmentService } from '@app/shared/services/etablishment.service';
//others
import { Helper } from '../../../shared/helper';
import { RoleEnum } from '../../../shared/enumerations/role.enum';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  rolesEnum = RoleEnum;
  @Input() employee: Employee;
  @Input() action: string;
  roles: Role[] = [];
  etablishments: Etablishment[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private employeeService: EmployeeService,
    private notification: NzNotificationService,
    private auth: AuthenticationService,
    private roleService: RoleService,
    private etablismentService: EtablishmentService) {}

  ngOnInit(): void {
    this.initForm();
    this.getRoles();
    this.getEtablishments();
  }

  getRoles(){
    this.roleService.getAll({pagination: false})
      .subscribe((res: Role) => {
        this.roles = res['hydra:member'];
      }, error => {
        this.notification.error("Echec", "Erreur lors du chargement des rôles!");
      })
  }

  getEtablishments(){
    this.etablismentService.getAll({pagination: false})
      .subscribe((res: Etablishment) => {
        this.etablishments = res['hydra:member'];
      }, error => {
        this.notification.error("Echec", "Erreur lors du chargement des établissements!");
      })
  }

  initForm(){
    if(this.action === 'create'){
      var role = this.keys(this.rolesEnum);
      this.employee = {
        "@id": null,
        username: '',
        email: '',
        enabled: true,
        firstname: '',
        name: '',
        phoneNumber1: '',
        phoneNumber2: '',
        role: null,
        password: '',
        etablishment: null
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
        enabled: [true],
        role: [null, [Validators.required]],
        etablishment: [null, [Validators.required]],
      });
    }else{
      this.validateForm = this.fb.group({
        username: [this.action == 'edit' ? this.employee.username : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        name: [this.action == 'edit' ? this.employee.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        firstname: [this.action == 'edit' ? this.employee.firstname : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [this.action == 'edit' ? this.employee.email : null, [Validators.email, Validators.required]],
        phoneNumber1: [this.action == 'edit' ? this.employee.phoneNumber1 : null, [Validators.required]],
        phoneNumber2: [this.action == 'edit' ? this.employee.phoneNumber2 : null],
        enabled: [this.action == 'edit' ? this.employee.enabled : true],
        role: [this.action == 'edit' ? (this.employee.role ? this.employee.role['@id'] : null) : null, [Validators.required]],
        etablishment: [this.action == 'edit' ? (this.employee.etablishment ? this.employee.etablishment['@id'] : null) : null, [Validators.required]],
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format employee
    this.employee.username = this.validateForm.value.username; 
    this.employee.name = this.validateForm.value.name;
    this.employee.firstname = this.validateForm.value.firstname;
    this.employee.email = this.validateForm.value.email;
    if(this.action === 'create'){
      this.employee.password = this.validateForm.value.password;
    }
    this.employee.phoneNumber1 = Helper.formatPhoneNumber(this.validateForm.value.phoneNumber1);
    this.employee.phoneNumber2 = Helper.formatPhoneNumber(this.validateForm.value.phoneNumber2);
    this.employee.enabled = this.validateForm.value.enabled;
    this.employee.role = this.validateForm.value.role;
    this.employee.etablishment = this.validateForm.value.etablishment;

    this.isLoading = true;
    if(this.action === 'create'){
      this.employeeService.create(this.employee)
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
      this.employeeService.patch(this.employee)
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
