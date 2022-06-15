import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, FormArray } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';

//interfaces
import { Etablishment } from '../../../shared/interfaces/etablishment.type';
import { Manager } from '../../../shared/interfaces/manager.type';
//services
import { EtablishmentService } from '../../../shared/services/etablishment.service';
import { ManagerService } from '../../../shared/services/manager.service';

@Component({
  selector: 'app-add-manager-etablishment',
  templateUrl: './add-manager-etablishment.component.html',
  styleUrls: ['./add-manager-etablishment.component.css']
})
export class AddManagerEtablishmentComponent implements OnInit {

  @Input() etablishment: Etablishment;
  managers: Manager[] = [];
  validateForm: FormGroup;
  isLoading: Boolean = false;

  constructor(
    private managerService: ManagerService,
    private etablishmentService: EtablishmentService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private notification: NzNotificationService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      manager: [this.etablishment.manager ?  this.etablishment.manager.id : null, [Validators.required]]
    });

    this.getManagers();
  }

  getManagers(){
    this.managerService.getAll({
      pagination: false
    }).subscribe((res) => {
      this.managers = res['hydra:member'];
    }, error => {
      this.notification.error("Echec", "Erreur lors du chargements des responsables!");
    })
  }

  closeModal(){
    this.modal.destroy();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //On recupere le manager parmi la liste
    let index = this.managers.findIndex(x => x.id === this.validateForm.value.manager);
    if(index !== -1){
      this.etablishment.manager = this.managers[index];

      this.isLoading = true;
      this.etablishmentService.update(this.etablishment)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succès", "Responsable ajouté!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          console.log(error);
          this.notification.error("Echec", "Impossible d'ajouter ce responsable!");
        });
    }
  }

}
