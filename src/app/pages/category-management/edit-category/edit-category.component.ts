import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm
  metakey:any=[]
  imgSrc:string
  listArray:any=[]
  categoryImage:any
  categorytId:any
  imageuploaded: boolean = false;
  image: any;
  constructor(private formbuilder:FormBuilder ,private apiService:ApiFunctionalityService,private commonServcie:CommonService, private router:Router ,public activatedRoute:ActivatedRoute) { 
    this.categorytId= this.activatedRoute.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.categoryForm=this.formbuilder.group({
      categoryType:['',[Validators.required]],
      categoryName:['',[Validators.required]],
      metakey:[''],
      document:[''],
      status:[''],
    })

    this.getCategory()
    this.categoryList()
  }


  categoryList(){
    let apiReqUrl="category/listCategory"
    var apiReqData = new FormData();
    // apiReqData.append('page',String(this.currentPage))
    this.commonServcie.showSpinner()
    this.apiService.postFormDataApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
     if(res.responseCode==200){
      this.listArray = res.result.docs
       this.commonServcie.hideSpinner()
      //  this.commonServcie.successToast(res.responseMessage)
     }
     else{
       this.commonServcie.hideSpinner()
       this.commonServcie.errorToast(res.responseMessage)
     }
    })
   }
    /* -=-=-=-=-=-=-=- edit Category Api -=-=-=-=-=-=-=-=- */
    editCategory(){
      let apiReqUrl="category/editCategory"
      var apiReqData = {
        "_id": this.categorytId,
        "categoryName": this.categoryForm.value.categoryName,
        "categoryType": this.categoryForm.value.categoryType,
        "categoryImage": this.croppedImage ? this.croppedImage : this.categoryImage,
        "metaKeyword": this.metakey,
        "status": this.categoryForm.value.status,
      };
      console.log(apiReqData);
      
        this.commonServcie.showSpinner()
        this.apiService.putApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
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

/* -=-=-=-=-=- view Category -=-=-=-=-=-==-=- */
    getCategory(){
      let apiReqUrl=`category/viewCategory?_id=${this.categorytId}`
      // this.common.showSpinner()
      
      this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
       if(res.responseCode==200){
       
          this.categoryForm.patchValue({
            categoryType:res?.result?.categoryType,
            categoryName:res?.result?.categoryName,
            // categoryImage:
            status:res?.result?.status
          })  
          this.categoryImage=res?.result?.categoryImage,
          this.metakey=res?.result?.metaKeyword
          this.commonServcie.hideSpinner()
       }
       else{

        this.commonServcie.hideSpinner()
        this.commonServcie.errorToast(res.responseMessage)
       }
      })
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
