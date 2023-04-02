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
    if(this.action === 'create'){
      this.owner = {
        name: '',
        firstname: '',
        contact: '',
        address: '',
        email: ''
      }

      this.validateForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        firstname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        contact: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        address: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
      });
    }else{
      this.validateForm = this.fb.group({
        name: [this.action == 'edit' ? this.owner.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        firstname: [this.action == 'edit' ? this.owner.firstname : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        contact: [this.action == 'edit' ? this.owner.contact : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        address: [this.action == 'edit' ? this.owner.address : null, [Validators.required]],
        email: [this.action == 'edit' ? this.owner.email : null, [Validators.email]],
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format owner
    this.owner.name = this.validateForm.value.name; 
    this.owner.firstname = this.validateForm.value.firstname;
    this.owner.contact = this.validateForm.value.contact;
    this.owner.address = this.validateForm.value.address;
    this.owner.email = this.validateForm.value.email;

    this.isLoading = true;
    if(this.action === 'create'){
      this.ownerService.create(this.owner)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Elément ajouté avec succè!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          this.notification.error("Echec création", "Erreur lors de la création du type de produit!");
        });
    }else{
      this.ownerService.update(this.owner)
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
