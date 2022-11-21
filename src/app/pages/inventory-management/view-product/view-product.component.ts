import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productId:any
  productData:any
  metaKey:any = []
  images:any = []
  useCurrency : any = localStorage.getItem("useCurrency")

  constructor(private commonService:CommonService, private apiService:ApiFunctionalityService, private rout:ActivatedRoute) {
    this.rout.queryParams.subscribe(res=>{
      this.productId = res.product_id
    })
   }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    let url = `product/viewProduct?_id=${this.productId}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res:any)=>{
      if(res.responseCode == 200){
        this.productData = res.result
        this.metaKey = res.result.metaKeyword
        console.log(this.metaKey);
        
        this.images = this.productData.image
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
}
