import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Cycle } from '@app/shared/interfaces/level.type';
//services
import { CycleService } from '@app/shared/services/cycle.service';

@Component({
  selector: 'app-cycle-modal',
  templateUrl: './cycle-modal.component.html',
  styleUrls: ['./cycle-modal.component.css']
})
export class CycleModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() cycle: Cycle;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private cycleService: CycleService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.validateForm = this.fb.group({
      id: [this.cycle ? this.cycle.id : null],
      name: [this.cycle ? this.cycle.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [this.cycle ? this.cycle.description : null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
  }



  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.isLoading = true;
    if(this.action === 'create'){
      this.cycleService.create(this.validateForm.value)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succés", "Elément ajouté avec succè!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          this.notification.error("Echec création", "Erreur lors de l'enregistrement de l'élément!");
        });
    }else{
      this.cycleService.patch(this.validateForm.value)
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
