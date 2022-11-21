import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $ : any
@Component({
  selector: 'app-edit-home-screen',
  templateUrl: './edit-home-screen.component.html',
  styleUrls: ['./edit-home-screen.component.css']
})
export class EditHomeScreenComponent implements OnInit {
  imgSrc: string;
  homeScreenForm :FormGroup
  homeScreenId:any
  imageuploaded: boolean = false;
  image: any;
  categoryType : any
  homeObj : any
  constructor(private apiService:ApiFunctionalityService,public commonService:CommonService, private router:Router ,private activateRoute:ActivatedRoute) { 
    this.homeScreenId=this.activateRoute.snapshot.paramMap.get("id")
    this.activateRoute.queryParams.subscribe((res)=>{
      this.categoryType = res.type
    })
  }

  ngOnInit(): void {
    this.homeScreenForm=new FormGroup({
      homeScreenImage:new FormControl(''),
    })
    this.homeObj = JSON.parse(localStorage.getItem('homeScreen'))
    this.imgSrc = this.homeObj.homeScreenImage
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
  uploadImageFunc(img) {
    var image = new FormData();
    image.append('uploaded_file', img)
    var apiReqUrl="product/uploadFile"
    this.commonService.showSpinner();
    this.apiService.postFormDataApi(apiReqUrl,image,1).subscribe((res:any) => {
   
      if (res['responseCode'] == '200') {
        this.imgSrc = res["result"]["url"];
        this.commonService.hideSpinner();
        this.commonService.successToast(res.responseMessage);
      }
      else {
        this.commonService.hideSpinner();
        this.commonService.errorToast(res.responseMessage);
      }
    })
  }
  edithomeScreen(){
    let apiReqUrl=`admin/homeScreenUpdate?_id=${this.homeScreenId}`
    var apiReqData ={
      'homeScreenImage':this.croppedImage ? this.croppedImage : this.imgSrc,
      // 'name': this.homeScreenForm.value.homeScreenName
    }
    this.commonService.showSpinner()
    this.apiService.postApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
     if(res.responseCode==200){
       // console.log(res.result.docs);
       this.router.navigate(['/setting/home-screen'])
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
