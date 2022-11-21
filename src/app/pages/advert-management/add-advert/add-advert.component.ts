import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.css']
})
export class AddAdvertComponent implements OnInit {
  advertForm
  productImage: any
  imageuploaded: boolean = false;
  image: any;
  constructor(private formbuilder: FormBuilder, public service: ApiFunctionalityService, public commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.advertForm = this.formbuilder.group({
      description: ['', [Validators.required]],
      runtime: ['', [Validators.required]],
      document: ['', [Validators.required]],
    })
    
  }
  //------ add category -------// 
  addAdvert() {
    let url = "admin/addAdvertiesment"
    const data = {
      "description": this.advertForm.value.description,
      "runtime": this.advertForm.value.runtime,
      "advertiesmentImage": this.croppedImage
    }
    this.commonService.showSpinner()
    this.service.postApi(url, data, 1).subscribe((res) => {
      if (res['responseCode'] == 200) {
        this.commonService.hideSpinner()
        this.commonService.successToast(res["responseMessage"])
        this.router.navigate(['/advert/advert-list'])

      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res["responseMessage"])
      }
    }, (err: any) => {
      this.commonService.hideSpinner();
      this.commonService.errorToast(err['error']['responseMessage']);
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
  uploadFile(image) {
    let url = `product/uploadFile`
    // let images = image.target.files[0]

    var apiReqData = new FormData();
    apiReqData.append('uploaded_file', image)
    this.commonService.showSpinner()
    this.service.postFormDataApi(url, apiReqData, 1).subscribe((res) => {
      if (res["responseCode"] == 200) {
        this.productImage = res["result"]["url"]
        this.commonService.hideSpinner()
        this.commonService.successToast(res['responseMessage'])
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast("something went wrong.")
      }
    })
  }
}
