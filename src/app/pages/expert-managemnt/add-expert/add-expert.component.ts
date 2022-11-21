import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService, CountryCode } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.css']
})
export class AddExpertComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  expertForm
  imgSrc: string;
  serviceList: any = []
  regExName = /^[a-zA-Z ]{3,}$/i;
  regExEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
  regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  regExMobileNumber = /(?!0+$)[A-Z0-9][0-9]{9}/i;
  imageuploaded: boolean = false
  image: any
  myControl = new FormControl('+91');
  filteredOptions: Observable<CountryCode[]>;
  countryList = []
  newPassword: boolean = true

  // commissionPercent:any
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'description',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event);

    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  reset() {
    this.croppedImage = ""
  }

  constructor(private formbuilder: FormBuilder, private apiService: ApiFunctionalityService, public common: CommonService, private router: Router) {


  }

  ngOnInit(): void {
    this.expertForm = this.formbuilder.group({
      expertType: ['', [Validators.required]],
      firstname: [''],
      lastname: [''],
      NRC_Number: [''],
      companyName: [''],
      // status:['',[Validators.required]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.regExEmail)]],
      registrationNumber: [''],
      address: ['', [Validators.required]],
      trade: new FormArray([]),
      document: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      commision: [''],
      commissionPercent: [''],
      password: ['', [Validators.required, Validators.pattern(this.regExPassword)]],
      confirmPassword: ['', [Validators.required]],
      status : ['ACTIVE'],
    })
    this.expertForm.get('expertType').valueChanges.subscribe(val => {
      if (val == 'COMPANY') {
        this.expertForm.get('companyName').setValidators([Validators.required]);
        this.expertForm.get('registrationNumber').setValidators([Validators.required]);
        this.expertForm.get('firstname').clearValidators();
        this.expertForm.get('lastname').clearValidators();
        this.expertForm.get('NRC_Number').clearValidators();
      }
      else if (val == 'INDIVIDUAL') {
        this.expertForm.get('firstname').setValidators([Validators.required, Validators.pattern(this.regExName)]);
        this.expertForm.get('lastname').setValidators([Validators.required, Validators.pattern(this.regExName)]);
        this.expertForm.get('NRC_Number').setValidators([Validators.required]);
        this.expertForm.get('companyName').clearValidators();
        this.expertForm.get('registrationNumber').clearValidators();
      }
      this.expertForm.get('companyName').updateValueAndValidity();
      this.expertForm.get('registrationNumber').updateValueAndValidity();
      this.expertForm.get('firstname').updateValueAndValidity();
      this.expertForm.get('lastname').updateValueAndValidity();
      this.expertForm.get('NRC_Number').updateValueAndValidity();
    })

    console.log(this.expertForm);
    this.countryList = this.common.countryListJson;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filter(value) : this.countryList.slice())),
    );
    this.getAllServiceList()
  }
  private _filter(value: string): CountryCode[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter(option => option.code.toLowerCase().includes(filterValue));
    // return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));



  }



  // uploadImg(event): void {
    // var img = $event.target.files[0];
    // this.imageuploaded = true;
    // if (event.target.files && event.target.files[0]) {
      // const max_height = 200;
      // const max_width = 200;
      // const reader = new FileReader();
      // reader.onload = (e: any) => {
      //   const image = new Image();
      //   image.src = e.target.result;
      //   image.onload = rs => {
      //     const img_height = rs.currentTarget['height'];
      //     const img_width = rs.currentTarget['width'];
      //     console.log(img_height);
      //     if (img_height <= max_height) {
      //       // this.uploadImageFunc(event.target.files[0]);
      //       $('#resizeImageModal').modal('show')
      //       this.fileChangeEvent(event)
      //       this.croppedImage = ""
      //     } else {
      //       this.image = ''

      //       this.common.errorToast('Please upload image of size max-height and max-width 200px only.')
      //       $('#resizeImageModal').modal('show')
      //       this.fileChangeEvent(event)

      //     }
      //   };
      // };
      // reader.readAsDataURL(event.target.files[0]);
  //     this.uploadImageFunc(event.target.files[0])
  //   }
  // }
  uploadImageFunc(img) {
    var image = new FormData();
    image.append('uploaded_file', img)
    var apiReqUrl = "product/uploadFile"
    this.common.showSpinner();
    this.apiService.postFormDataApi(apiReqUrl, image, 1).subscribe((res: any) => {

      if (res['responseCode'] == '200') {
        this.imgSrc = res['result']['url'];
        console.log(this.imgSrc)
        this.common.hideSpinner();
        this.common.successToast(res.responseMessage);
      }
      else {
        this.common.hideSpinner();
        this.common.errorToast(res.responseMessage);
      }
    })
  }
  /* -=-=-=-=-=-=-=- Add expert Api -=-=-=-=-=-=-=-=- */
  addExpert() {

    let apiReqUrl = "admin/addExperts"
    var apiReqData = {
      "email": this.expertForm.value.email,
      // "firstName":this.expertForm.value.firstname ?this.expertForm.value.firstname : "",
      // "surName":this.expertForm.value.lastname ? this.expertForm.value.lastname : "" ,
      "mobileNumber": this.expertForm.value.mobileNumber,
      "countryCode": this.myControl.value,
      "expertType": this.expertForm.value.expertType,
      "verificationDocs": this.croppedImage || this.imageLinks,
      // "nrcNumber":this.expertForm.value.NRC_Number ? this.expertForm.value.NRC_Number : "" ,
      // "status":this.expertForm.value.status,
      // "companyRegistrationNo": this.expertForm.value.registrationNumber ? this.expertForm.value.registrationNumber : "",
      "address": this.expertForm.value.address,
      // "companyName": this.expertForm.value.companyName ? this.expertForm.value.companyName : "",
      "trade": this.expertForm.value.trade,
      "commission": this.expertForm.value.commissionPercent,
      "userName": this.expertForm.value.username,
      "confirmPassword": this.expertForm.value.confirmPassword,
      "password": this.expertForm.value.confirmPassword,
      "status1" : this.expertForm.value.status,

    };
    if (this.expertForm.value.expertType == 'INDIVIDUAL') {
      apiReqData["firstName"] = this.expertForm.value.firstname,
        apiReqData["surName"] = this.expertForm.value.lastname,
        apiReqData["nrcNumber"] = this.expertForm.value.NRC_Number
    }
    else if (this.expertForm.value.expertType == 'COMPANY') {
      apiReqData["companyName"] = this.expertForm.value.companyName,
        apiReqData["companyRegistrationNo"] = this.expertForm.value.registrationNumber
    }
    var temp = this.common.removeEmptyKey(apiReqData)

    console.log(temp);

    this.common.showSpinner()
    this.apiService.postApi(apiReqUrl, temp, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.router.navigate(['/expert'])
        this.common.hideSpinner()
        this.common.successToast(res.responseMessage)
      }
      else {
        this.common.hideSpinner()
        this.common.errorToast(res.responseMessage)
      }
    })
  }

  getAllServiceList() {
    let url = "service/listServiceWithoutPagination"
    this.common.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {

      this.serviceList = res.result
      this.common.hideSpinner()
    })
  }
  restForm(value) {
    if (value == 'COMPANY') {
      this.expertForm.controls['firstname'].reset()
      this.expertForm.controls['lastname'].reset()
      this.expertForm.controls['NRC_Number'].reset()
    }
    else {
      this.expertForm.controls['companyName'].reset()
      this.expertForm.controls['registrationNumber'].reset()

    }
  }

  /* -=-=-=-=-=-=-=- select Item -=-=-=-=-=-=-= */
  onItemSelect(item: any) {
    console.log(item._id);
    const checkbox: FormArray = this.expertForm.get('trade') as FormArray
    checkbox.push(new FormControl(item._id))
  }
  /* -=-=-=-=-=-=-=- Deselect Item -=-=-=-=-=-=-= */
  onDeSelect(item: any) {
    const checkbox: FormArray = this.expertForm.get('trade') as FormArray
    const index = checkbox.controls.findIndex(x => x.value === item._id)
    checkbox.removeAt(index)
  }

  /* -=-=-=-=-=-=-=- SelectAll Items -=-=-=-=-=-=-= */
  onSelectAll(items: any) {


    const checkbox: FormArray = this.expertForm.get('trade') as FormArray
    items.forEach(element => {
      checkbox.push(new FormControl(element._id))
    })
    console.log();

  }
  /* -=-=-=-=-=-=-=- deSelectAll Items -=-=-=-=-=-=-= */
  onDeSelectAll(items: any) {
    const checkbox: FormArray = this.expertForm.get('trade') as FormArray
    checkbox.clear()
  }

  postImage: any = [];
  imageLinks: any = [];
  // multiple document send
  filesName : any = [] 
  uploadImg(event) {
    this.postImage = [];
    var img = [];
    this.filesName = []
    this.filesName = event.target.files;
    img = event.target.files;
    let url = "admin/uploadMultipleFile";
    const formData = new FormData();
    // formData.append("files",String(img));
    this.common.showSpinner()
    this.imageLinks =[]
    for(let i =0;i<event.target.files.length;i++){
      // console.log((event.target.files[i].size / 1024).toFixed(2) + " KB",(event.target.files[i].size / 1048576).toFixed(2) + " MB");
      if(Number((event.target.files[i].size / 1048576).toFixed(2)) <= 5){

        formData.append("files",event.target.files[i])
      }
      else{
        this.common.errorToast(`Can not upload ${event.target.files[i].name} file size of more than 5 MB`)
      }
    }
    this.apiService.postFormDataApi(url, formData, 1).subscribe((res) => {
      console.log(res);
      this.common.hideSpinner()
      if (res["responseCode"] == 200) {
        this.imgSrc = res["result"]["mediaResult"];

        for(let i =0;i<res["result"]["mediaResult"].length;i++){
          this.imageLinks[i] = res["result"]["mediaResult"][i]["mediaUrl"]

       }


      } else {
        this.common.hideSpinner()
        this.common.errorToast("Can't Upload This File");
      }
    });
  }
  // uploadProfilePic(img, i) {
  //   let url = "uploadMultipleFile";
  //   this.imageLinks[i] = "assets/gif/imageLoader.gif";
  //   const formData = new FormData();
  //   formData.append("uploaded_file",img);
  //   this.apiService.postFormDataApi(url, formData, 1).subscribe((res) => {
  //     if (res["responseCode"] == 200) {
  //       this.imgSrc = res["result"]["secure_url"];


  //       this.imageLinks[i] = res["result"]["secure_url"]


  //     } else {
  //       this.common.errorToast("Can't Upload This File");
  //     }
  //   });
  // }

  removeImage(idx) {
    console.log(idx);
    this.imageLinks.splice(idx, 1);
    console.log(this.imageLinks);
    // this.filesName.splice(idx, 1);
    console.log(this.filesName);

  }
  
}
