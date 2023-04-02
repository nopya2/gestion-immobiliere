import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Owner } from '@app/shared/interfaces/owner.type';
//services
import { OwnerService } from '@app/shared/services/owner.service';

@Component({
  selector: 'app-type-produit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class OwnerFormModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() owner: Owner;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private ownerService: OwnerService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      firstname: [null],
      contact: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });

    if(this.action === "edit"){
      this.validateForm.reset(this.owner);
    }
    
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.isLoading = true;
    if(this.action === 'create'){
      this.ownerService.create(this.validateForm.value)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Elément ajouté avec succè!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          this.notification.error("Echec création", "Erreur lors de la création du propriétaire!");
        });
    }else{
      this.ownerService.update(this.validateForm.value)
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

  

}
