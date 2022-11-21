import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

declare var $
@Component({
  selector: 'app-add-slider-image',
  templateUrl: './add-slider-image.component.html',
  styleUrls: ['./add-slider-image.component.css']
})
export class AddSliderImageComponent implements OnInit {
  bannerForm:FormGroup
  productImage:any
  imageuploaded: boolean = false;
  image: any;
  constructor(private apiService:ApiFunctionalityService, private commonService:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.bannerForm=new FormGroup({
      'sliderTitle':new FormControl('', Validators.required)
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
    // if(this.productImage.length < 5){
      let url = `product/uploadFile`
      // let images = image.target.files[0]
      var apiReqData = new FormData();
      apiReqData.append('uploaded_file',image)
      this.commonService.showSpinner()
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


  addSliderImage(){
    let url = `admin/addBanner`
    if(this.croppedImage){
      let data = {
        "bannerName": this.bannerForm.value.sliderTitle,
        "bannerImage": [this.croppedImage]
      }
      this.commonService.showSpinner()
      this.apiService.postApi(url,data,1).subscribe((res)=>{
        if(res.responseCode==200){
          this.router.navigate(['/setting/slider-image'])
          this.commonService.hideSpinner()
          this.commonService.successToast(res.responseMessage)
        }
        else{
          this.commonService.hideSpinner()
          this.commonService.errorToast(res.responseMessage)
        }
      })
    }
    else{
      this.commonService.warningToast("Please choose image")
    }
  }
}
