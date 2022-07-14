import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Faculty } from '@app/shared/interfaces/faculty.type';
//services
import { FacultyService } from '@app/shared/services/faculty.service';

@Component({
  selector: 'app-faculty-modal',
  templateUrl: './faculty-modal.component.html',
  styleUrls: ['./faculty-modal.component.css']
})
export class FacultyModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() faculty: Faculty;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private facultyService: FacultyService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    if(this.action === 'create'){
      this.faculty = {
        name: '',
        description: '',
        code: null
      }

      this.validateForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        code: [null, [Validators.required]],
      });
    }else{
      this.validateForm = this.fb.group({
        name: [this.action == 'edit' ? this.faculty.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        description: [this.action == 'edit' ? this.faculty.description : null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        code: [this.action == 'edit' ? this.faculty.code : null, [Validators.required]]
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format faculty
    this.faculty.name = this.validateForm.value.name; 
    this.faculty.description = this.validateForm.value.description;
    this.faculty.code = this.validateForm.value.code;

    this.isLoading = true;
    if(this.action === 'create'){
      this.facultyService.create(this.faculty)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Elément ajouté avec succè!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          // this.notification.error("Echec création", "Login ou mot de passse invalide!");
        });
    }else{
      this.facultyService.update(this.faculty)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Informations enregistrées!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
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
