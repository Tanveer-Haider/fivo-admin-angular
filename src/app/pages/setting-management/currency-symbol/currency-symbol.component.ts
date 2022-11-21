import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-currency-symbol',
  templateUrl: './currency-symbol.component.html',
  styleUrls: ['./currency-symbol.component.css']
})
export class CurrencySymbolComponent implements OnInit {
  currency_symbols : any = []
  currency_logo : any = {}
symbolForm:FormGroup

  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService) { }

  ngOnInit(): void {
    this.symbolForm = new FormGroup({
      'symbol':new FormControl('',[Validators.required])
    })
    // this.getBannerList()
    this.currencyList()
  }
currencyList(){
  let url = `admin/listCurrency`
  this.commonService.showSpinner()
  this.apiService.getApi(url,1).subscribe((res)=>{
    if(res.responseCode==200){
      this.currency_symbols = Object.keys(res.result)
      this.currency_logo = res.result
      this.viewCurrency()
      this.commonService.hideSpinner()
      this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
}
viewCurrency(){
  let url = `admin/viewCurrency`
  this.commonService.showSpinner()
  this.apiService.postApi(url,{},1).subscribe((res)=>{
    if(res.responseCode==200){
      this.symbolForm.patchValue({
        'symbol' : res.result.currencySymbol
      })
      
      this.commonService.hideSpinner()
      this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
}
// getBannerList(){
//   let url = `admin/listCurrency`
//   this.commonService.showSpinner()
//   this.apiService.getApi(url,1).subscribe((res)=>{
//     if(res.responseCode==200){
//       this.listArray = res.result
//       this.commonService.hideSpinner()
//       this.commonService.successToast(res.responseMessage)
//     }
//     else{
//       this.commonService.hideSpinner()
//       this.commonService.errorToast(res.responseMessage)
//     }
//   })
// }

selectCurrency(e){
  
}
setCurrency(){
  let url = `admin/addCurrency`
  let data ={
    "currencySymbol": (this.symbolForm.value.symbol)
  }
  this.commonService.showSpinner()
  this.apiService.postApi(url,data,1).subscribe((res)=>{
    if(res.responseCode==200){
      localStorage.setItem("useCurrency",String(this.symbolForm.value.symbol))
      this.commonService.hideSpinner()
      this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
}

}
