import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

//interfaces
import { Department } from '@app/shared/interfaces/department.type';
//services
import { DepartmentService } from '@app/shared/services/department.service';

@Component({
  selector: 'app-department-modal',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.css']
})
export class DepartmentModalComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  @Input() department: Department;
  @Input() action: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private departmentService: DepartmentService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.validateForm = this.fb.group({
      id: [this.department ? this.department.id : null],
      name: [this.department ? this.department.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      code: [this.department ? this.department.code : null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      description: [this.department ? this.department.description : null, [Validators.required, Validators.minLength(2)]]
    });
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.isLoading = true;
    if(this.action === 'create'){
      this.departmentService.create(this.validateForm.value)
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
      this.departmentService.patch(this.validateForm.value)
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
