import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  dropdownList = [];
  serviceData = []
  serviceForm;
  metakey=[]
  categories=[]
  imageuploaded: boolean = false;
  image: any;
  productImage:any
  dropdownSettings : IDropdownSettings= {};
  constructor(private formbuilder:FormBuilder,private commonService:CommonService, private apiService:ApiFunctionalityService,private router:Router) { }

  ngOnInit(): void {
    this.getCategory()
    this.serviceForm = this.formbuilder.group({
      category:['',[Validators.required]],
      unit:['',[Validators.required]],
      price:['',[Validators.required]],
      meta:[''],
      
      document:['',[Validators.required]],
      status:['ACTIVE'],
      description:['',[Validators.required]],
    })
    this.dropdownList = [ ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  // number input type
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // get category id
  getCategory(){
    let url = `category/listCategory`
    this.apiService.postApi(url,{},1).subscribe(res=>{
      if(res.responseCode==200){
        this.categories = res.result.docs.filter((val)=>{
          return val.categoryType == "SERVICE"
        })
        console.log(this.categories);
      }
      else{
        this.commonService.errorToast("Don't have categories.")
      }
    })
  }

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
  reset(){
    this.croppedImage = ""
  }
  uploadImg(event): void {
    // var img = $event.target.files[0];
    this.imageuploaded = true;
    if (event.target.files && event.target.files[0]) {
      $('#resizeImageModal').modal('show')
      this.fileChangeEvent(event)

    }
  }

  uploadFile(image){
    let url = `product/uploadFile`
    // let images = image.target.files[0]
    var apiReqData = new FormData();
    this.commonService.showSpinner()
    apiReqData.append('uploaded_file',image)
    this.apiService.postFormDataApi(url,apiReqData,1).subscribe((res)=>{
      if(res['responseCode']==200){
        this.productImage = res["result"]["url"]
        this.commonService.hideSpinner()
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast("something went wrong.")
      }
    })
  }


  addService(){
    let url = `service/addService`
    if(this.serviceForm.valid){
      let data = {
        "categoryId": this.serviceForm.value.category,
        "unit":String(this.serviceForm.value.unit),
        "description": this.serviceForm.value.description,
        "price": String(this.serviceForm.value.price),
        // "discount": String(this.serviceForm.value.discount),
        "serviceImage":this.croppedImage,
        "metaKeyword": this.metakey ,
        "status1" : String(this.serviceForm.value.status),
        }
        this.commonService.showSpinner()
        this.apiService.postApi(url,data,1).subscribe((res:any)=>{
        if(res.responseCode==200){
          this.commonService.hideSpinner()
          this.commonService.successToast(res.responseMessage)
          this.router.navigate(['/services'])
        }
        else{
          this.commonService.hideSpinner()
          this.commonService.errorToast(res.responseMessage)
        }
      })
    }
    else{
      console.log(this.serviceForm.value);
      
      this.commonService.warningToast("Please fill all the fields.")
    }
  }

  addMetaKey(value){
   if(this.serviceForm.value.meta){
    { this.metakey.push(value.value)}
  //  else{
     this.commonService.warningToast("You cannot add metakey more than 10.")
  //  }
   }
    this.serviceForm.controls['meta'].reset()
    console.log(this.metakey.length);
    
  }
  removeMetakey(item,i){
    this.metakey.splice(i,1)
  }

}