import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm
  productId:any
  productData:any
  productImage:any
  metakey = []
  documentImage = []
  metaKeyList = []
  categories:any
  categoryId:any
  imageuploaded:boolean=false
  image:any
  constructor(private formbuilder:FormBuilder, private router:Router,public commonService:CommonService, private apiService:ApiFunctionalityService,private rout:ActivatedRoute) { 
    this.rout.queryParams.subscribe(res=>{
      this.productId = res.product_id
    })
  }

  ngOnInit(): void {
    this.getCategory()
    this.getProduct()
    this.productForm=this.formbuilder.group({
      category:['',[Validators.required]],
      unit:['',[Validators.required]],
      item:['',[Validators.required]],
      stock:['',[Validators.required]],
      brand:['',[Validators.required]],
      reorderLevel:['',[Validators.required]],
      size:['',[Validators.required]],
      price:['',[Validators.required]],
      colour:['',[Validators.required]],
      // discount:['',[Validators.required]],
      document:[''],
      status:[''],
      metakey:[''],
    })
  }

  // get product details 
  getProduct(){
    let url = `product/viewProduct?_id=${this.productId}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res:any)=>{
      if(res.responseCode == 200){
        this.productData = res.result
        this.productForm.patchValue({
          category:this.productData.categoryId._id,
          unit:this.productData.unit,
          item:this.productData.item,
          stock:this.productData.stock,
          brand:this.productData.brand,
          reorderLevel:this.productData.reorderLevel ? this.productData.reorderLevel : '',
          size:this.productData.size,
          price:this.productData.price,
          colour:this.productData.color,
          // discount:this.productData.discount,
          // document:this.productData.image,
          status:this.productData.status == "ACTIVE" ? true : false,
        })
        this.documentImage=this.productData.image
        this.metakey=this.productData.metaKeyword
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

  uploadImageFunc(event){
    let images = event.target.files[0]
    this.productImage=images
    let url = `product/uploadFile`
    var apiReqData = new FormData();
    apiReqData.append('uploaded_file',images)
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(url,apiReqData,1).subscribe((res)=>{
      if(res["responseCode"]==200){
        this.productImage = res["result"]["url"]
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
    console.log(res)
    if(res.responseCode==200){
      this.categories = res.result.docs.filter((val)=>{
        return val.categoryType == "MATERIAL"

      })
    }
    else{
      this.commonService.errorToast("Don't have categories.")
    }
  })
}


  editProduct(){
    let url = `product/updateProduct`
    // if(this.productForm.valid){
      let data = {
        "_id": this.productId,
        "categoryId": this.categoryId ? this.categoryId : this.productForm.value.category,
        "item": this.productForm.value.item,
        "brand": this.productForm.value.brand,
        "size": String(this.productForm.value.size),
        "color": this.productForm.value.colour,
        "unit": String(this.productForm.value.unit),
        "stock": Number(this.productForm.value.stock),
        "reorderLevel": Number(this.productForm.value.reorderLevel),
        "price": Number(this.productForm.value.price),
        "status1":this.productForm.value.status ? 'ACTIVE' : 'BLOCK',
        "image": this.croppedImage ? String(this.croppedImage) : String(this.documentImage),
        "metaKeyword": 
          this.metakey
      }
      this.commonService.showSpinner()
      this.apiService.putApi(url,data,1).subscribe((res)=>{
        if(res.responseCode==200){
          this.router.navigate(['/inventory'])
          this.commonService.hideSpinner()
          this.commonService.successToast(res.responseMessage)
        }
        else{
          this.commonService.hideSpinner()
          this.commonService.errorToast(res.responseMessage)
        }
      })
    // }
    // else{
    //   this.commonService.warningToast("Please fill all the fields.")
    // }
  }

  addMetaKey(value){
    if(this.productForm.value.metakey){
      if(this.metakey.length<=10){ this.metakey.push(value.value)}
   else{
     this.commonService.warningToast("You cannot add metakey more than 10.")
   }
     }
    this.productForm.controls['metakey'].reset()
  }
  removeMetakey(item,i){
    this.metakey.splice(i,1)
  }

}
