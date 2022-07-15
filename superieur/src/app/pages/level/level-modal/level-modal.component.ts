import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Level, LevelType } from '@app/shared/interfaces/level.type';
//services
import { LevelService } from '@app/shared/services/level.service';
import { Faculty } from '@app/shared/interfaces/faculty.type';
import { Diploma } from '@app/shared/interfaces/diploma.type';

@Component({
  selector: 'app-level-modal',
  templateUrl: './level-modal.component.html',
  styleUrls: ['./level-modal.component.css']
})
export class LevelModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() level: Level;
  @Input() action: string;
  faculties: Faculty[] = [];
  levelTypes: LevelType[] = [];
  diplomas: Diploma[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private levelService: LevelService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.validateForm = this.fb.group({
      name: [this.level ? this.level.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      code: [this.level ? this.level.code : null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      description: [this.level ? this.level.description : null],
      faculty: [(this.level && this.level.faculty) ? this.level.faculty.id : null, [Validators.required]],
      obtainedDiploma: [(this.level && this.level.obtainedDiploma) ? this.level.obtainedDiploma.name : null, [Validators.required]],
      preparedDiploma: [(this.level && this.level.preparedDiploma) ? this.level.preparedDiploma.name : null, [Validators.required]],
      duration: [this.level ? this.level.duration : null, [Validators.required]],
      levelType: [(this.level && this.level.levelType) ? this.level.levelType.name : null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format le type
    this.level.name = this.validateForm.value.name; 
    this.level.code = this.validateForm.value.code;
    this.level.description = this.validateForm.value.description;
    this.level.faculty = this.validateForm.value.faculty;
    this.level.obtainedDiploma = this.validateForm.value.obtainedDiploma;
    this.level.preparedDiploma = this.validateForm.value.preparedDiploma;
    this.level.duration = this.validateForm.value.duration;
    this.level.levelType = this.validateForm.value.levelType;

    this.isLoading = true;
    if(this.action === 'create'){
      this.levelService.create(this.level)
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
      this.levelService.patch(this.level)
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
