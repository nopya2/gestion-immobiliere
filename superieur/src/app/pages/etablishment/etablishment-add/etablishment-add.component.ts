import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, FormArray } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Store, select } from '@ngrx/store';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

//others
import { Helper } from '../../../shared/helper';
import { EtablishmentTypeEnum } from '../../../shared/enumerations/etablishment-type.enum';
//store
import { retrievedCountryList } from '../../../shared/store/country.action';
//interfaces
import { Country } from '../../../shared/interfaces/country.type';
import { Etablishment } from '../../../shared/interfaces/etablishment.type';
//services
import { EtablishmentService } from '../../../shared/services/etablishment.service';
import { CountryService } from '../../../shared/services/country.service';
import { albumCollectionByAlbumId } from 'src/app/shared/store/country.selector';


@Component({
  selector: 'app-etablishment-add',
  templateUrl: './etablishment-add.component.html',
  styleUrls: ['./etablishment-add.component.css']
})
export class EtablishmentAddComponent implements OnInit {

  keys = Object.keys;
  validateForm: FormGroup;
  isLoading: Boolean = false;
  etablishmentTypes = EtablishmentTypeEnum;
  @Input() etablishment: Etablishment;
  @Input() action: string;
  countries: any = [];
  allCountries= this.store.pipe(
    select(albumCollectionByAlbumId(''))
  )
  loading = false;
  avatarUrl?: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private etablishmentService: EtablishmentService,
    private notification: NzNotificationService,
    private store: Store<{ countries: Country[] }>,
    private countryService: CountryService,
    private msg: NzMessageService) {}

  ngOnInit(): void {
    this.initForm();

    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  // get phones(){
  //   return this.validateForm.controls['phones'] as FormArray;
  // }

  initForm(){
    if(this.action === 'create'){
      this.etablishment = {
        email: '',
        name: '',
        address: "",
        city: "",
        country: "Gabon",
        logo: {
          id: null,
          "@id": null,
          filename: null,
          size: null,
          extension: null,
          url: null
        },
        phones: [],
        website: '',
        etablishmentType: null,
        postalBox: null,
        information: {
          academicYear: null,
          startYear: null,
          endYear: null
        }
      }

      this.validateForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: [null, [Validators.email, Validators.required]],
        address: [null, [Validators.required]],
        city: [null, [Validators.required, Validators.minLength(3)]],
        country: ['Gabon', [Validators.required]],
        url: [null, Validators.required],
        website: [null],
        postalBox: [null],
        etablishmentType: [null, [Validators.required]],
        phones: this.fb.array([])
      });
      this.addPhone(null);
    }else{
      this.avatarUrl = Helper.formatUrl(this.etablishment.logo.url);
      this.etablishment.logo.oldUrl = this.etablishment.logo.url;
      this.validateForm = this.fb.group({
        name: [this.action == 'edit' ? this.etablishment.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [this.action == 'edit' ? this.etablishment.email : null, [Validators.email, Validators.required]],
        address: [this.action == 'edit' ? this.etablishment.address : null, [Validators.required]],
        city: [this.action == 'edit' ? this.etablishment.city : null, [Validators.required, Validators.minLength(3)]],
        country: [this.action == 'edit' ? this.etablishment.country : 'Gabon', [Validators.required]],
        url: [null],
        website: [this.action == 'edit' ? this.etablishment.website : null],
        postalBox: [this.action == 'edit' ? this.etablishment.postalBox : null],
        etablishmentType: [this.action == 'edit' ? this.etablishment.etablishmentType : null, [Validators.required]],
        phones: this.fb.array([])
      });
      this.etablishment.phones.forEach(el => {
        this.addPhone(el);
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    //Format etablishment
    this.etablishment.name = this.validateForm.value.name; 
    this.etablishment.email = this.validateForm.value.email;
    this.etablishment.address = this.validateForm.value.address;
    this.etablishment.city = this.validateForm.value.city;
    this.etablishment.country = this.validateForm.value.country;
    this.etablishment.website = this.validateForm.value.website;
    this.etablishment.etablishmentType = this.validateForm.value.etablishmentType;
    this.etablishment.postalBox = this.validateForm.value.postalBox;
    //Format phones
    this.etablishment.phones = [];
    this.validateForm.value.phones.forEach(element => {
      this.etablishment.phones.push(Helper.formatPhoneNumber(element.phoneNumber));
    });

    this.isLoading = true;
    if(this.action === 'create'){
      this.etablishmentService.create(this.etablishment)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succès", "Elément ajouté avec succè!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          this.notification.error("Echec création", "Erreur lors de la création de l'élément!");
        });
    }else{
      this.etablishmentService.patch(this.etablishment)
        .subscribe((res) => {
          this.isLoading = false;
          this.notification.success("Succès", "Informations enregistrées!");
          this.modal.close(res);
        }, error => {
          this.isLoading = false;
          console.log(error);
          this.notification.error("Echec", "Erreur lors de l'enregistrement des informations!");
        });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  closeModal(){
    this.modal.destroy();
  }

  addPhone(phoneNumber: string){
    let phones = this.validateForm.get('phones') as FormArray;
    phones.push(this.fb.group({
      phoneNumber : [phoneNumber, Validators.required]
    }));
  }

  removePhone(i){
    let phones = this.validateForm.get('phones') as FormArray;
    phones.removeAt(i);
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.getBase64(info.file!.originFileObj!, (img: string) => {
      this.loading = false;
      this.avatarUrl = img;
      this.validateForm.controls['url'].setValue(img);

      this.etablishment.logo.extension = info.file.type;
      this.etablishment.logo.size = info.file.size;
      this.etablishment.logo.filename = info.file.name;
      this.etablishment.logo.url = img;
    });

    console.log(info);
    // switch (info.file.status) {
    //   case 'uploading':
    //     this.loading = true;
    //     break;
    //   case 'done':
    //     // Get this url from response in real world.
    //     this.getBase64(info.file!.originFileObj!, (img: string) => {
    //       this.loading = false;
    //       this.avatarUrl = img;
    //     });
    //     break;
    //   case 'error':
    //     this.msg.error('Network error');
    //     this.loading = false;
    //     break;
    // }
  }

}
