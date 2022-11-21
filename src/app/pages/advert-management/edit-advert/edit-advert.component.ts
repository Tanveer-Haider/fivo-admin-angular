import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.css']
})
export class EditAdvertComponent implements OnInit {
  advertForm:FormGroup
  advertData:any =[]
  advertId:any
  productImage: any
 imageUrl:any
 imageuploaded: boolean = false;
 image: any;

  constructor(private formbuilder:FormBuilder, public service:ApiFunctionalityService, public commonService:CommonService, private router:Router,public activatedRouting:ActivatedRoute) { 
    this.activatedRouting.queryParams.subscribe((res:any)=>{
      this.advertId=res.id
    })
  }

  ngOnInit(): void {
    this.advertForm=this.formbuilder.group({
      description:['',[Validators.required]],
      runtime:['',[Validators.required]],
    })
    this.getAdvert()
  }
 //------ view individual data of category------//
 getAdvert(){
  let url ="admin/viewAdvertiesment?_id="+this.advertId;
  this.commonService.showSpinner()
  this.service.getApi(url,1).subscribe((res)=>{
    if (res['responseCode'] ==200) {
      this.advertData=res['result']
      this.advertForm.patchValue({
        description: res.result.description,
        runtime:res.result.runtime,
       
      })
      this.productImage = res.result.advertiesmentImage
      this.commonService.hideSpinner()
      // this.commonService.successToast(res['responseMessage'])
    } else {
      this.commonService.hideSpinner()
      this.commonService.errorToast(res['responseMessage'])
    }
  })
}

//------ update individual data of category------//
updateCategory(){
  let url = "admin/editAdvertiesment"
  const data = {
      "_id": this.advertId,
      "runtime": this.advertForm.value.runtime,
      "description": this.advertForm.value.description,
      "advertiesmentImage": this.croppedImage ? this.croppedImage : this.productImage
      }

  this.service.putApi(url,data,1).subscribe((res)=>{
    if (res['responseCode'] ==200) {
      this.commonService.hideSpinner()
      this.commonService.successToast(res['responseMessage'])
      this.router.navigate(['/advert/advert-list'])
    } else {
      this.commonService.hideSpinner()
      this.commonService.errorToast(res['responseMessage'])
    }
  }, (err)=>{
    this.commonService.hideSpinner()
    this.commonService.errorToast("This category already exists.")
  }
  )
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
  apiReqData.append('uploaded_file',image)
  this.service.postFormDataApi(url,apiReqData,1).subscribe((res)=>{
    if(res["responseCode"]==200){
      this.productImage = res["result"]["url"]
    }
    else{
      this.commonService.errorToast("something went wrong.")
    }
  })
}
}
