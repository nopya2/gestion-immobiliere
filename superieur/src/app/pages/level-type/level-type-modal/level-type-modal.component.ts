import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { LevelType } from '@app/shared/interfaces/level.type';
//services
import { LevelTypeService } from '@app/shared/services/level-type.service';

@Component({
  selector: 'app-level-type-modal',
  templateUrl: './level-type-modal.component.html',
  styleUrls: ['./level-type-modal.component.css']
})
export class LevelTypeModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() levelType: LevelType;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private levelTypeService: LevelTypeService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    if(this.action === 'create'){
      this.levelType = {
        name: '',
        code: '',
      }

      this.validateForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      });
    }else{
      this.validateForm = this.fb.group({
        name: [this.action == 'edit' ? this.levelType.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        code: [this.action == 'edit' ? this.levelType.code : null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format le type
    this.levelType.name = this.validateForm.value.name; 
    this.levelType.code = this.validateForm.value.code;

    this.isLoading = true;
    if(this.action === 'create'){
      this.levelTypeService.create(this.levelType)
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
      this.levelTypeService.patch(this.levelType)
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

  public capitalizeString(event){
    const arr = event.target.value.split(" ");
    
    for(let i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      console.log(arr[i]);
    }

    const str2 = arr.join(" ");

    this.validateForm.patchValue({
        name: str2
    });
  }

}
