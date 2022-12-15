import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-edit-slider-image',
  templateUrl: './edit-slider-image.component.html',
  styleUrls: ['./edit-slider-image.component.css']
})
export class EditSliderImageComponent implements OnInit {
  bannerForm:FormGroup
  productImage:any
  banner_id:any
  imageuploaded: boolean = false;
  image: any;
  constructor(private apiService:ApiFunctionalityService, private commonService:CommonService,private router:Router,private rout:ActivatedRoute) {
    this.rout.queryParams.subscribe(res=>{
      this.banner_id=res.id
    })
   }

  ngOnInit(): void {
    this.bannerForm=new FormGroup({
      'sliderTitle':new FormControl('', Validators.required),
      'sliderNumber':new FormControl('', Validators.required),
      'sliderDescription':new FormControl('', Validators.required),
    })
    // this.getSliderImage()
  }


  getSliderImage(){
    let url = `slider/viewSlider?_id=${this.banner_id}`
      this.commonService.showSpinner()
      this.apiService.getApi(url,1).subscribe((res)=>{
        if(res.responseCode==200){
          this.bannerForm.patchValue({
            'sliderTitle':res.result.title,
            'sliderDescription':res.result.description,
            'sliderNumber':res.result.slideNumber,

          })
          this.productImage = res.result.bannerImage[0]
          this.commonService.hideSpinner()
          // this.commonService.successToast(res.responseMessage)
        }
        else{
          this.commonService.hideSpinner()
          this.commonService.errorToast(res.responseMessage)
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
      this.productImage = event.base64
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
    let url = `admin/editBanner`
    let data = {
      '_id':this.banner_id,
      'bannerName':this.bannerForm.value.sliderTitle,
      'bannerImage':[this.productImage],
      'sliderNumber':new FormControl('', Validators.required),
      'sliderDescription':new FormControl('', Validators.required),
    }
    if(this.productImage){
      this.commonService.showSpinner()
      this.apiService.putApi(url,data,1).subscribe((res)=>{
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
