import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $ : any
@Component({
  selector: 'app-client-signin-screens-background-image',
  templateUrl: './client-signin-screens-background-image.component.html',
  styleUrls: ['./client-signin-screens-background-image.component.css']
})
export class ClientSigninScreensBackgroundImageComponent implements OnInit {
  backgroundId:any
  imgSrc: string;
  constructor(private apiService:ApiFunctionalityService,public commonService:CommonService, private router:Router) { }

  ngOnInit(): void {
    this.listBackground()
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
    $('#resizeImageModal').modal('show')
    this.fileChangeEvent(event)
  }
  uploadImageFunc(img) {
    var image = new FormData();
    image.append('uploaded_file', img)
    var apiReqUrl="product/uploadFile"
    this.commonService.showSpinner();
    this.apiService.postFormDataApi(apiReqUrl,image,1).subscribe((res:any) => {
   
      if (res['responseCode'] == '200') {
        this.imgSrc = res["result"]["url"]
        this.commonService.hideSpinner();
        this.commonService.successToast(res.responseMessage);
      }
      else {
        this.commonService.hideSpinner();
        this.commonService.errorToast(res.responseMessage);
      }
    })
  }
  listBackground(){
    let apiReqUrl="admin/backGroundList"
    this.commonService.showSpinner()
    this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
     if(res.responseCode==200){
       this.backgroundId=res.result[0]._id
       this.imgSrc=res.result[0].backGroundImage
       console.log(this.backgroundId);
       
       this.commonService.hideSpinner()
      //  this.commonService.successToast(res.responseMessage)
     }
     else{
       this.commonService.hideSpinner()
       this.commonService.errorToast(res.responseMessage)
     }
    })
   }

   editBackground(){
    let apiReqUrl=`admin/backGroundUpdate`
    var apiReqData ={
      'backGroundImage':this.croppedImage ? this.croppedImage  : this.imgSrc
    }

    this.commonService.showSpinner()
    this.apiService.postApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
     if(res.responseCode==200){
       // console.log(res.result.docs);
       this.commonService.hideSpinner()
       this.commonService.successToast(res.responseMessage)
     }
     else{
       this.commonService.hideSpinner()
       this.commonService.errorToast(res.responseMessage)
     }
    })
   }
  openUpdateModal(){
 
    $('#upadteModal').modal({
      show : true,
      backdrop : false
    })
  }
}
