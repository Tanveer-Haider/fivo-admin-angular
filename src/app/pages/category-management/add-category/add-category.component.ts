import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm
  imgSrc: string;
  imageuploaded: boolean = false;
  image: any;
  metakey = []
  constructor(private formbuilder:FormBuilder ,private apiService:ApiFunctionalityService,private commonServcie:CommonService, private router:Router) { }

  ngOnInit(): void {
    this.categoryForm=this.formbuilder.group({
      categoryType:['',[Validators.required]],
      categoryName:['',[Validators.required]],
      metakey:[''],
      document:['',[Validators.required]],
      status:[''],
    })
  }


  /* -=-=-=-=-=-=-=- Add Category Api -=-=-=-=-=-=-=-=- */
  addCategory(){
  let apiReqUrl="category/addCategory"
  if(this.categoryForm.valid){
    var apiReqData = {
      "categoryName": this.categoryForm.value.categoryName,
      "categoryType": this.categoryForm.value.categoryType,
      "status": this.categoryForm.value.status,
      "categoryImage": this.croppedImage,
      "metaKeyword": this.metakey ,
  
    };
    console.log(apiReqData);
    
      this.commonServcie.showSpinner()
      this.apiService.postApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
       if(res.responseCode==200){
         this.router.navigate(['/category'])
         this.commonServcie.hideSpinner()
         this.commonServcie.successToast(res.responseMessage)
       }
       else{
        this.commonServcie.hideSpinner()
        this.commonServcie.errorToast(res.responseMessage)
       }
      })
    }
    else{
      this.commonServcie.warningToast("Please fill all the fields.")
    }

    
}


addMeta(value){
  if(this.categoryForm.value.metakey){
   this.metakey.push(value.value)
  }
   this.categoryForm.controls['metakey'].reset()
 }
 removeMetakey(item,i){
   this.metakey.splice(i,1)
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
  
  this.imageuploaded = true;
  if (event.target.files && event.target.files[0]) {
   
  $('#resizeImageModal').modal('show')
  this.fileChangeEvent(event)
  }
}
uploadImageFunc(img) {
  var image = new FormData();
  image.append('uploaded_file', img)
  var apiReqUrl="product/uploadFile"
  this.commonServcie.showSpinner();
  this.apiService.postFormDataApi(apiReqUrl,image,1).subscribe((res:any) => {
 
    if (res['responseCode'] == '200') {
      this.imgSrc = res["result"]["url"]
      this.commonServcie.hideSpinner();
      this.commonServcie.successToast(res.responseMessage);
    }
    else {
      this.commonServcie.hideSpinner();
      this.commonServcie.errorToast(res.responseMessage);
    }
  })
}

}
