import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { TypeProduit } from '@app/shared/interfaces/type-produit.type';
//services
import { TypeProduitService } from '@app/shared/services/type-produit.service';

@Component({
  selector: 'app-type-produit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class TypeProduitFormModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() typeProduit: TypeProduit;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private typeProduitService: TypeProduitService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    if(this.action === 'create'){
      this.typeProduit = {
        label: '',
        description: ''
      }

      this.validateForm = this.fb.group({
        label: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [''],
      });
    }else{
      this.validateForm = this.fb.group({
        label: [this.action == 'edit' ? this.typeProduit.label : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [this.action == 'edit' ? this.typeProduit.description : null]
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format typeProduit
    this.typeProduit.label = this.validateForm.value.label; 
    this.typeProduit.description = this.validateForm.value.description;

    this.isLoading = true;
    if(this.action === 'create'){
      this.typeProduitService.create(this.typeProduit)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Elément ajouté avec succè!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          this.notification.error("Echec création", "Erreur lors de la création du type de produit!");
        });
    }else{
      this.typeProduitService.update(this.typeProduit)
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
