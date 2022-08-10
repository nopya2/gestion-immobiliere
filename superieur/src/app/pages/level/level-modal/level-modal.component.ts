import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Level, LevelType } from '@app/shared/interfaces/level.type';
//services
import { LevelService } from '@app/shared/services/level.service';
import { FacultyService } from '@app/shared/services/faculty.service';
import { LevelTypeService } from '@app/shared/services/level-type.service';
import { DiplomaService } from '@app/shared/services/diploma.service';
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
    private notification: NzNotificationService,
    private facultyService: FacultyService,
    private levelTypeService: LevelTypeService,
    private diplomaService: DiplomaService) {}

  ngOnInit(): void {
    this.initForm();

    this.getFaculties();

    this.getLevelTypes();
  }

  initForm(){
    this.validateForm = this.fb.group({
      id: [this.level ? this.level.id : null],
      name: [this.level ? this.level.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      code: [this.level ? this.level.code : null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      description: [this.level ? this.level.description : null],
      faculty: [(this.level && this.level.faculty) ? this.level.faculty['@id'] : null, [Validators.required]],
      obtainedDiploma: [(this.level && this.level.obtainedDiploma) ? this.level.obtainedDiploma['@id'] : null],
      preparedDiploma: [(this.level && this.level.preparedDiploma) ? this.level.preparedDiploma['@id'] : null, [Validators.required]],
      duration: [this.level ? this.level.duration : null, [Validators.required]],
      levelType: [(this.level && this.level.levelType) ? this.level.levelType['@id'] : null, [Validators.required]],
    });
  }

  getFaculties(): void {
    this.facultyService.getAll({pagination: false})
      .subscribe((res) => {
        this.faculties = res['hydra:member'];

        if(this.level){
          console.log(0);
          this.onSelectFaculty(this.level.faculty['@id']);
        }
      }, error => {
        this.notification.error("Erreur", "Erreur lors du chargement des filières!")
      })
  }

  getLevelTypes(): void {
    this.levelTypeService.getAll({pagination: false})
      .subscribe((res) => {
        this.levelTypes = res['hydra:member'];
      }, error => {
        this.notification.error("Erreur", "Erreur lors du chargement les types de niveau!")
      })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format le type
    // this.level.name = this.validateForm.value.name; 
    // this.level.code = this.validateForm.value.code;
    // this.level.description = this.validateForm.value.description;
    // this.level.faculty = this.validateForm.value.faculty;
    // this.level.obtainedDiploma = this.validateForm.value.obtainedDiploma;
    // this.level.preparedDiploma = this.validateForm.value.preparedDiploma;
    // this.level.duration = this.validateForm.value.duration;
    // this.level.levelType = this.validateForm.value.levelType;

    this.isLoading = true;
    if(this.action === 'create'){
      this.levelService.create(this.validateForm.value)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Elément ajouté avec succè!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          this.notification.error("Echec création", "Erreur lors de l'enregistrement de l'élément!");
        });
    }else{
      this.levelService.patch(this.validateForm.value)
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

  closeModal(){
    this.modal.destroy();
  }

  public capitalizeString(event){
    const arr = event.target.value.split(" ");
    
    for(let i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    const str2 = arr.join(" ");

    this.validateForm.patchValue({
        name: str2
    });
  }

  /**
   * On récupère les diplomes en focntion de la filière
   * @param event 
   */
  onSelectFaculty(event){
    let index = this.faculties.findIndex(x => x['@id'] === event);
    if(index !== -1){
      this.diplomas = [...this.faculties[index].diplomas];
    }
  }

  editorConfig = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  
        [{ 'align': [] }],
        ['link', 'image']                        
    ]
  };

}
