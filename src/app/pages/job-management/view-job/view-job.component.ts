import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
  orderId: any
  orderMaterialId: any
  orderDetail: any = []
  orderMaterialDetail: any = []
  pageSize: any = 5
  total: any
  currentPage = 0
  listArray: any = []
  stars: number[] = [1, 2, 3, 4, 5];

  serviceData:any
  metakey:any=[]
  serviceId:any
  pending_job_listArray : any = []
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiFunctionalityService, private commonService: CommonService,private router : Router) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.orderId = res.id
      this.orderMaterialId = res.id
      this.serviceId = res.id
    })

  }

  ngOnInit(): void {
    this.getOderDetail()
    // this.getOderMaterialDetail()
    this.expertList()
    // this.getService()
    this.getpendingJobList()
   
  }

  serviceListDetails: any = [];
  serviceAgent : any = [];
  getOderDetail() {
    let url = "admin/orderView/" + this.orderId
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.orderDetail = res.result
        this.serviceListDetails = res.result.serviceId
        this.serviceAgent = res.result.discountId
        console.log(this.serviceAgent);
        
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, (err) => {
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.responseMessage)
    })

  }

  // getOderMaterialDetail() {
  //   let url = "admin/viewOrderMaterial?metarialId=" + this.orderMaterialId
  //   this.commonService.showSpinner()
  //   this.apiService.getApi(url, 1).subscribe((res) => {
  //     if (res.responseCode == 200) {
  //       this.orderMaterialDetail = res.result
  //       this.commonService.hideSpinner()
  //       this.commonService.successToast(res.responseMessage)
  //     }
  //     else {
  //       this.commonService.hideSpinner()
  //       this.commonService.errorToast(res.responseMessage)
  //     }
  //   }, (err) => {
  //     this.commonService.hideSpinner()
  //     this.commonService.errorToast(err.responseMessage)
  //   })

  // }





  //  assign variable
  deliveragent: any = "61b98e66bf52ffe82a40bd78"
  order: any = "61b4852b60443c404b129bc2"
  //  assign order by client
  assignOrder() {
    let apiReqUrl = "admin/assignOrderDeliveryAgent"
    let apiReqData = {
      deliveryAgentId: this.deliveragent,
      orderId: this.order
    }
    this.commonService.showSpinner()
    this.apiService.putApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        // console.log(res.result.docs);
        // this.listArray = res.result.docs
        // this.total = res.result.total
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  onCheckboxChange(event) {
    console.log(event);
    
    //  if (event.target.checked) {
    //    const index = this.managementArray.findIndex(x => x.id == event.target.value)
    //    this.managementArray[index][accessName] = true;
    //  } else {
    //    const index = this.managementArray.findIndex(x => x.id == event.target.value)
    //    this.managementArray[index][accessName] = false;
    //  }
    //  this.checkIfAllSelected(accessName)
  }

  trade:any
  /* -=-=-=-=-=-=- Api of expert List -=-=-=-=-=-==-=-= */
  tradeListDetails: any = []
  expertList(){
    let apiReqUrl="admin/listExpert"
    // var apiReqData = new FormData();
    // apiReqData.append('page',String(this.currentPage))
    // apiReqData.append('limit',String(10))
    const data = {
      page : 1,
      limit : 10
    }
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(apiReqUrl,data,1).subscribe((res:any)=>{
     if(res.responseCode==200){
      this.listArray = res.result.docs
      this.tradeListDetails = res.result.docs.trade
      this.total = res.result.total
      res.result.docs.forEach((element,index) => {
        this.trade=element.trade
        console.log(this.trade);     
      });

    
      
      // this.getAllServiceList()
      // var str2 = this.listArray.forEach(element => {
      //     return element.trade
      // });

      // this.selectedItems = this.serviceList.filter((response,index)=>{
      //   return str2[index].includes(response?._id)
      // })
      // console.log(this.selectedItems);
      
      // this.selectedItems
       this.commonService.hideSpinner()
      //  this.commonService.successToast(res.responseMessage)
     }
     else{
       this.commonService.hideSpinner()
       this.commonService.errorToast(res.responseMessage)
     }
    })
   }


    // view service
  getService(){
    let url = `service/viewService?_id=${this.serviceId}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.serviceData = res.result
        this.metakey = res.result.metaKeyword
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }


getpendingJobList(){
  let url = `admin/pendingjobOrderList`
  this.commonService.showSpinner()
  this.apiService.getApi(url,1).subscribe((res)=>{
    if(res.responseCode==200){
      this.pending_job_listArray = res.result
        this.total= res.result.total
      this.commonService.hideSpinner()
      // this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
}

counter(i: number) {
  console.log(i)
  let tempArr = []
  if(i==0){
    return tempArr
  }
  return new Array(i);
}
navigateView(id){
  this.router.navigate([`expert/view-expert/${id}`])
}
isAssending : boolean =  true
sortName(arr,key){
  
}
sortAgent(key){
  if(this.isAssending){
   this.listArray =  this.listArray.sort((a,b)=>{
    return a[key] > b[key] ? 1 : -1
    })
  }
  else{
    this.listArray =  this.listArray.sort((a,b)=>{
      return a[key] < b[key] ? 1 : -1
      })
  }
}
}
