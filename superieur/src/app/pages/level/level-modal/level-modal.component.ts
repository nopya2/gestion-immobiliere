import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Level, LevelType, Cycle } from '@app/shared/interfaces/level.type';
import { Faculty } from '@app/shared/interfaces/faculty.type';
import { Diploma } from '@app/shared/interfaces/diploma.type';
//services
import { LevelService } from '@app/shared/services/level.service';
import { FacultyService } from '@app/shared/services/faculty.service';
import { DiplomaService } from '@app/shared/services/diploma.service';
import { CycleService } from '@app/shared/services/cycle.service';

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
  cycles: Cycle[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private levelService: LevelService,
    private notification: NzNotificationService,
    private facultyService: FacultyService,
    private diplomaService: DiplomaService,
    private cycleService: CycleService) {}

  ngOnInit(): void {
    this.initForm();

    this.getParams();
  }

  getParams(){
    //chargement des filières
    this.facultyService.getAll({pagination: false})
      .subscribe((res) => {
        this.faculties = res['hydra:member'];

        if(this.level){
          console.log(0);
          this.onSelectFaculty(this.level.faculty['@id']);
        }
      }, error => {
        this.notification.error("Erreur", "Erreur lors du chargement des filières!")
      });

      //Chargement des cycles
      this.cycleService.getAll({pagination: false})
      .subscribe((res) => {
        this.cycles = res['hydra:member'];
      }, error => {
        this.notification.error("Erreur", "Erreur lors du chargement des cycles!")
      })

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
      cycle: [(this.level && this.level.levelType && this.level.levelType.cycle) ? this.level.levelType.cycle['@id'] : null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

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
   * On récupère les diplomes en fonction de la filière
   * @param event 
   */
  onSelectFaculty(event){
    let index = this.faculties.findIndex(x => x['@id'] === event);
    if(index !== -1){
      this.diplomas = [...this.faculties[index].diplomas];
    }
  }

  /**
   * On récupère les parcours en fonction du cyle
   * @param event 
   */
   onSelectCycle(event){
    let index = this.cycles.findIndex(x => x['@id'] === event);
    if(index !== -1){
      this.levelTypes = [...this.cycles[index].levelTypes];
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
