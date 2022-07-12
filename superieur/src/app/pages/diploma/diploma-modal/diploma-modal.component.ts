import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Diploma } from '@app/shared/interfaces/diploma.type';
//services
import { DiplomaService } from '@app/shared/services/diploma.service';

@Component({
  selector: 'app-diploma-modal',
  templateUrl: './diploma-modal.component.html',
  styleUrls: ['./diploma-modal.component.css']
})
export class DiplomaModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() diploma: Diploma;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private diplomaService: DiplomaService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    if(this.action === 'create'){
      this.diploma = {
        name: '',
        description: '',
        duration: null
      }

      this.validateForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        duration: [null, [Validators.required]],
      });
    }else{
      this.validateForm = this.fb.group({
        name: [this.action == 'edit' ? this.diploma.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [this.action == 'edit' ? this.diploma.description : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        duration: [this.action == 'edit' ? this.diploma.duration : null, [Validators.required]]
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format diploma
    this.diploma.name = this.validateForm.value.name; 
    this.diploma.description = this.validateForm.value.description;
    this.diploma.duration = this.validateForm.value.duration;

    this.isLoading = true;
    if(this.action === 'create'){
      this.diplomaService.create(this.diploma)
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
      this.diplomaService.patch(this.diploma)
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
