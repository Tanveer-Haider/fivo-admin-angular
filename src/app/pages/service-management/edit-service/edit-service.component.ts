import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  dropdownList = [];
  serviceForm
  categories=[]
  documentImage:any
  categoryId:any
  serviceData:any
  metakey:any=[]
  serviceId:any
  imageuploaded: boolean = false;
  image: any;
  dropdownSettings : IDropdownSettings= {};
  constructor(private router:Router,private formbuilder:FormBuilder,public commonService:CommonService,private apiService:ApiFunctionalityService,private rout:ActivatedRoute) {
    this.rout.queryParams.subscribe(res=>{
      this.serviceId = res.id
    })
   }

  ngOnInit(): void {
    this.getService()
    this.getCategory()
    this.serviceForm = this.formbuilder.group({
      category:['',[Validators.required]],
      unit:['',[Validators.required]],
      price:['',[Validators.required]],
      meta:['',[Validators.required]],
      // discount:['',[Validators.required]],
      document:['',[Validators.required]],
      status:['',[Validators.required]],
      description:['',[Validators.required]],
    })
    this.dropdownList = [
      { item_id: 1, item_text: 'Bike' },
      { item_id: 2, item_text: 'Open Van' },
      { item_id: 3, item_text: 'Light truck' },
      { item_id: 4, item_text: 'Heavy duty truck' },
    ];
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


  // get Service details 
  getService(){
    let url = `service/viewService?_id=${this.serviceId}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res:any)=>{
      if(res.responseCode == 200){
        this.serviceData = res.result
        this.serviceForm.patchValue({
          category:this.serviceData.categoryId._id,
          unit:this.serviceData.unit,
          description:this.serviceData.description,
          price:this.serviceData.price,
          document:this.serviceData.document,
          // discount:this.serviceData.discount,
          // document:this.serviceData.image,
          status:this.serviceData.status
        })
        this.documentImage=this.serviceData.serviceImage
        this.metakey=res.result.categoryId.metaKeyword
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  selectId(id){
    this.categoryId = id.target.value
    
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
    var apiReqData = new FormData();
    apiReqData.append('uploaded_file',image)
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(url,apiReqData,1).subscribe((res)=>{
      if(res["responseCode"]==200){
        this.documentImage = res["result"]["url"]
        this.commonService.hideSpinner()
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast("something went wrong.")
      }
    })
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


  editService(){
    let url = `service/editService`
    let data = {
      "_id": this.serviceId,
      "categoryId": this.categoryId?this.categoryId:this.serviceForm.value.category,
      "unit": this.serviceForm.value.unit,
      "description":this.serviceForm.value.description,
      "price": String(this.serviceForm.value.price),
      // "discount": String(this.serviceForm.value.discount),
      "serviceImage": this.croppedImage ? this.croppedImage : this.documentImage,
      "metaKeyword": this.metakey,
      "status1":this.serviceForm.value.status
    }
    this.commonService.showSpinner()
    this.apiService.putApi(url,data,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.router.navigate(['/services'])
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  addMetaKey(value){
    if(this.serviceForm.value.meta){
      if(this.metakey.length<=10){ this.metakey.push(value.value)}
   else{
     this.commonService.warningToast("You cannot add metakey more than 10.")
   }
     }
    this.serviceForm.controls['meta'].reset()
  }
  removeMetakey(item,i){
    this.metakey.splice(i,1)
  }

}
