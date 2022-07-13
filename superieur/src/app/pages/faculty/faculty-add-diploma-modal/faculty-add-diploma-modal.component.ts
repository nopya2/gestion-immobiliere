import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Faculty } from '@app/shared/interfaces/faculty.type';
import { Diploma } from '@app/shared/interfaces/diploma.type';
//services
import { FacultyService } from '@app/shared/services/faculty.service';
import { DiplomaService } from '@app/shared/services/diploma.service';

@Component({
  selector: 'app-faculty-add-diploma-modal',
  templateUrl: './faculty-add-diploma-modal.component.html',
  styleUrls: ['./faculty-add-diploma-modal.component.css']
})
export class FacultyAddDiplomaModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  initLoading: Boolean = true;
  isLoading: Boolean = false;
  @Input() faculty: Faculty;
  diplomas: Diploma[] = [];
  selectedDiplomas: Diploma[] = [];

  constructor(
    private modal: NzModalRef,
    private facultyService: FacultyService,
    private diplomaService: DiplomaService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.getDiplomas();
  }

  getDiplomas(): void {
    this.initLoading = true;
    this.diplomaService.getAll({pagination: false})
      .subscribe((res: Diploma) => {
        this.initLoading = false;
        this.diplomas = res['hydra:member'];
      }, error => {
        this.initLoading = false;
        this.notification.error("Erreur", "Erreur lors du chargement des diplômes!")
      })
  }

  submitForm(): void {
    this.isLoading = true;
    console.log(this.selectedDiplomas);
    this.faculty.diplomas.push.apply(this.faculty.diplomas, this.selectedDiplomas);

    this.facultyService.update(this.faculty)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Diplômes ajoutés à la filière!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          console.log(error);
          this.notification.error("Echec", "Erreur lors de l'enregistrement des informations!");
        });
  }

  closeModal(){
    this.modal.destroy();
  }

  /**
   * Sélection et déselection d'un diplome
   * @param Diploma 
   * @param event 
   */
  updateSingleChecked(item: Diploma, event){
    if(event.target.checked){
      this.selectedDiplomas.push({...item});
    }else{
      let index = this.selectedDiplomas.findIndex(x => x.id === item.id);
      if(index != -1){
        this.selectedDiplomas.splice(index, 1);
      }
    }
  }
}
