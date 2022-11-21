import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productImage: any;
  imageuploaded: boolean = false
  image: any
  productForm
  metakey = []
  categories = []

  constructor(private formbuilder: FormBuilder, public commonService: CommonService, private apiService: ApiFunctionalityService, private router: Router) { }

  ngOnInit(): void {
    this.getCategory()
    this.productForm = this.formbuilder.group({
      category: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      item: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      reorderLevel: ['', [Validators.required]],
      size: ['', [Validators.required]],
      price: ['', [Validators.required]],
      colour: ['', [Validators.required]],
      // discount:[''],
      document: ['', [Validators.required]],
      status: [''],
      metakey: [''],
    })
  }

  // number input type
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // get category id
  getCategory() {
    let url = `category/categorylistwithoutPagination`
    this.apiService.postApi(url, {}, 1).subscribe(res => {
      if (res.responseCode == 200) {
        this.categories = res.result.filter((val) => {
          return val.categoryType == "MATERIAL"
        })
        console.log(this.categories);
      }
      else {
        this.commonService.errorToast("Don't have categories.")
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
  reset() {
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

  uploadImageFunc(image) {
    let url = `product/uploadFile`
    // let images = image.target.files[0]
    // let product_iamge = {
    //   'uploaded_file' : image
    // }
    var apiReqData = new FormData();
    apiReqData.append('uploaded_file', image)
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(url, apiReqData, 1).subscribe((res) => {
      if (res['responseCode'] == 200) {
        this.productImage = res["result"]["url"]
        this.commonService.hideSpinner()
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast("something went wrong.")
      }
    })
  }


  addProduct() {
    let url = `product/addProduct`
    let data = {
      "categoryId": this.productForm.value.category,
      "item": this.productForm.value.item,
      "brand": this.productForm.value.brand,
      "size": String(this.productForm.value.size),
      "color": this.productForm.value.colour,
      "unit": String(this.productForm.value.unit),
      "stock": Number(this.productForm.value.stock),
      "reorderLevel": Number(this.productForm.value.reorderLevel),
      "price": Number(this.productForm.value.price),
      "status1": this.productForm.value.status ? "ACTIVE" : "BLOCK",
      "image": this.croppedImage,
      "metaKeyword":
        this.metakey
    }
    this.commonService.showSpinner()
    this.apiService.postApi(url, data, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
        this.router.navigate(['/inventory'])
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }), err => {
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.responseMessage)
    }
  }

  addMetaKey(value) {
    if (this.productForm.value.metakey) {
      if (this.metakey.length <= 10) { this.metakey.push(value.value) }
      else {
        this.commonService.warningToast("You cannot add metakey more than 10.")
      }
    }
    this.productForm.controls['metakey'].reset()
  }
  removeMetakey(item, i) {
    this.metakey.splice(i, 1)
  }


  /**
   * ***********************************************************************
   * @param event upload bulk product in excel format
   */
  uploadExcelFunc(event) {
    let url = `product/productUploadBulk`
    let data = event.target.files[0]
    var apiReqData = new FormData();
    apiReqData.append('uploaded_file', data)
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(url, apiReqData, 1).subscribe((res: any) => {
      if (res['responseCode'] == 200) {
        let invalidExcelDataArray = res["result"]["invalidData"]
        if (invalidExcelDataArray.length) {
          this.exportAsXLSXInvalidProduct(invalidExcelDataArray)
        }
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
        this.router.navigate(['/inventory'])
      } else {
        this.commonService.hideSpinner()
        this.commonService.errorToast("something went wrong.")
      }
    })
  }

  //------------------ export as excel for download file --------------//
  exportAsXLSXInvalidProduct(invalidExcelDataArray) {
    invalidExcelDataArray.forEach(element => {
      let metaKeyword = '';
      // create metaKeyword as a string from array of object
      element.metaKeyword.forEach(ele => {
        metaKeyword = metaKeyword + (metaKeyword ? (',' + ele) : ele)
      });
      element.metaKeyword = metaKeyword
      // end metaKeyword as a string from array of object
    })
    let dataArr = [];
    invalidExcelDataArray.forEach((element, ind) => {
      let obj = {};
      obj = {
        "CategoryName": element.categoryName ? element.categoryName : "--",
        "Unit": element.unit ? element.unit : "--",
        "Item": element.item ? element.item : "--",
        "Stock": element.stock ? element.stock : "--",
        "Brand": element.brand ? element.brand : "--",
        "Reorder Level": element.reorderLevel ? element.reorderLevel : "--",
        "Size": element.size ? element.size : "--",
        "Price": element.price ? element.price : "--",
        "Color": element.color ? element.color : "--",
        "Image": element.image ? element.image : "--",
        "Status": element.status ? element.status : "--",
        "MetaKeyword": element.metaKeyword ? element.metaKeyword : "--",
        "SKU": element.sku ? element.sku : "--",
      };
      dataArr.push(obj);
    });
    this.commonService.exportAsExcelFile(dataArr, "Invalid Product Data");
  }

  //------------------ export as excel for format  --------------//
  exportExcelFormat() {
    let productDataArray = [
      {
        "categoryName":'Service',
        "brand": "lg",
        "color": "yellow",
        "item": "ttt",
        "size": "single",
        "image": "url",
        "metaKeyword": ["hhjh", "kkk"],
        "price": 10,
        "reorderLevel": 2,
        "sku": "hdgfh",
        "status": "ACTIVE",
        "stock": 5,
        "unit": "no"
      },
      {
        "categoryName":'Carpentry',
        "brand": "HCL",
        "color": "Red",
        "item": "ttt",
        "size": "Double",
        "image": "url",
        "metaKeyword": ["abc", "xyz"],
        "price": 20,
        "reorderLevel": 5,
        "sku": "abcc",
        "status": "ACTIVE",
        "stock": 10,
        "unit": "ltr"
      }
    ]

    productDataArray.forEach((element:any) => {
      let metaKeyword = '';
      // create metaKeyword as a string from array of object
      element.metaKeyword.forEach(ele => {
        metaKeyword = metaKeyword + (metaKeyword ? (',' + ele) : ele)
      });
      element.metaKeyword = metaKeyword
      // end metaKeyword as a string from array of object
    })
    let dataArr = [];
    productDataArray.forEach((element, ind) => {
      let obj = {};
      obj = {
        "CategoryName": element.categoryName ? element.categoryName : "--",
        "Unit": element.unit ? element.unit : "--",
        "Item": element.item ? element.item : "--",
        "Stock": element.stock ? element.stock : "--",
        "Brand": element.brand ? element.brand : "--",
        "Reorder Level": element.reorderLevel ? element.reorderLevel : "--",
        "Size": element.size ? element.size : "--",
        "Price": element.price ? element.price : "--",
        "Color": element.color ? element.color : "--",
        "Image": element.image ? element.image : "--",
        "Status": element.status ? element.status : "--",
        "MetaKeyword": element.metaKeyword ? element.metaKeyword : "--",
        "SKU": element.sku ? element.sku : "--",
      };
      dataArr.push(obj);
    });
    this.commonService.exportAsExcelFile(dataArr, "Product Excel Format");
  }

}
