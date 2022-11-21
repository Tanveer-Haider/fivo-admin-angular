import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $ : any
@Component({
  selector: 'app-client-signin-screens-logo',
  templateUrl: './client-signin-screens-logo.component.html',
  styleUrls: ['./client-signin-screens-logo.component.css']
})
export class ClientSigninScreensLogoComponent implements OnInit {
  imgSrc: string;
  logoId:any
  imageuploaded: boolean = false;
  image: any;
  constructor(private apiService:ApiFunctionalityService,public commonService:CommonService, private router:Router) { }
  
  ngOnInit(): void {
    // this.viewLogo()
    this.listLogo()
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    
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
    // if (event.target.files && event.target.files[0]) {
    //   $('#resizeImageModal').modal('show')
    //   this.fileChangeEvent(event)
    // }
    this.uploadImageFunc(event.target.files[0])
  }
  uploadImageFunc(img) {
    
    
    var image = new FormData();
    image.append('uploaded_file', img)
    var apiReqUrl="product/uploadFile"
    this.commonService.showSpinner();
    this.apiService.postFormDataApi(apiReqUrl,image,1).subscribe((res:any) => {
   
      if (res['responseCode'] == '200') {
        this.imgSrc =res["result"]["url"]
        this.commonService.hideSpinner();
        this.commonService.successToast(res.responseMessage);
      }
      else {
        this.commonService.hideSpinner();
        this.commonService.errorToast(res.responseMessage);
      }
    })
  }
/* -=-=-=-=-=-=-=-=- Add Logo -=-=-=-=-=-=-=-=-=- */
  addLogo(){
    let apiReqUrl="admin/addLogo"
    var apiReqData = {
      logoImage:this.croppedImage ? this.croppedImage : this.imgSrc
    }
    this.commonService.showSpinner()
    this.apiService.postApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
     if(res.responseCode==200){
       console.log(res.result.docs);
       this.logoId=res.result._id
       this.commonService.hideSpinner()
       this.commonService.successToast(res.responseMessage)
     }
     else{
       this.commonService.hideSpinner()
       this.commonService.errorToast(res.responseMessage)
     }
    })
   }

   editLogo(){
    let apiReqUrl=`admin/editLogo/`
    var apiReqData ={
      '_id':this.logoId,
      'logoImage':this.croppedImage ? this.croppedImage : this.imgSrc
    }
    this.commonService.showSpinner()
    this.apiService.putApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
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

  //  viewLogo(){
  //   let apiReqUrl=`admin/viewLogo/${this.logoId}`
  //   this.commonService.showSpinner()
  //   this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
  //    if(res.responseCode==200){
  //      // console.log(res.result.docs);
  //      this.imgSrc=res.result.logoImage
  //      this.commonService.hideSpinner()
  //      this.commonService.successToast(res.responseMessage)
  //    }
  //    else{
  //      this.commonService.hideSpinner()
  //      this.commonService.errorToast(res.responseMessage)
  //    }
  //   })
  //  }

   listLogo(){
    let apiReqUrl="admin/listLogo"
    this.commonService.showSpinner()
    this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
     if(res.responseCode==200){
       this.logoId=res.result[0]._id
       this.imgSrc=res.result[0].logoImage
       console.log(this.logoId);
       
       this.commonService.hideSpinner()
      //  this.commonService.successToast(res.responseMessage)
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
