import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Cycle, LevelType } from '@app/shared/interfaces/level.type';
//services
import { LevelTypeService } from '@app/shared/services/level-type.service';
import { CycleService } from '@app/shared/services/cycle.service';

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
  cycles: Cycle[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private levelTypeService: LevelTypeService,
    private notification: NzNotificationService,
    private cycleService: CycleService) {}

  ngOnInit(): void {
    this.initForm();

    this.getParams();
  }

  initForm(){
    this.validateForm = this.fb.group({
      id: [this.levelType ? this.levelType.id : null],
      name: [this.levelType ? this.levelType.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      code: [this.levelType ? this.levelType.code : null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      level: [this.levelType ? this.levelType.level : null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      cycle: [this.levelType && this.levelType.cycle ? this.levelType.cycle['@id'] : null, [Validators.required]],
    });
  }

  getParams(): void {
    //Chargement des cycles
    this.cycleService.getAll({pagination: false})
      .subscribe((res) => {
        this.cycles = res['hydra:member'];
      }, error => {
        this.notification.error("Erreur", "Erreur lors du chargement des cycles!")
      });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.isLoading = true;
    if(this.action === 'create'){
      this.levelTypeService.create(this.validateForm.value)
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
      this.levelTypeService.patch(this.validateForm.value)
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

  public capitalizeString(event, field){
    const arr = event.target.value.split(" ");
    
    for(let i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      console.log(arr[i]);
    }

    const str2 = arr.join(" ");

    switch(field){
      case 'name':
        this.validateForm.patchValue({
          name: str2
        });
        break;
      case 'level':
        this.validateForm.patchValue({
          level: str2
        });
        break;
    }
    
  }

}
