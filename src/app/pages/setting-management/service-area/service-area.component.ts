import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-service-area',
  templateUrl: './service-area.component.html',
  styleUrls: ['./service-area.component.css']
})
export class ServiceAreaComponent implements OnInit {
  action : any = 0
  deleteServiceId : any = []
  timer : any
  search:any
  selectAll : any
  vehicleId :any
  pageSize : any = 5
  total 
  currentPage = 1
  listArray : any = []
  AgentHeader:any = [
    {"id":1,"name":"All","backgroundColor":"bg-green","icon":"fa fa-bars"},
    // {"id":2,"name":"Active agents","backgroundColor":"bg-darkblue","icon":"fa fa-check"},
    // {"id":3,"name":"Inactive agents","backgroundColor":"bg-lightessblack","icon":"fa fa-times"}
  ]
  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService, private router:Router) {
    console.log("agent list component");
    // this.listArray=dummy
    
   }

  ngOnInit(): void {
    this.getDeliveryVehicleList()
  }

  getDeliveryVehicleList(){
    let url = `admin/listServiceArea`
    this.apiService.getApi(url,1).subscribe(res=>{
      if(res.responseCode==200){
        this.listArray = res.result
        this.total = res.result.length
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.listArray = []
        this.total = 0
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

openDeleteModal(id){
  this.deleteServiceId = []
  this.deleteServiceId[0] = id
  $('#deleteModal').modal({
    show : true,
    backdrop : false
  })
}

openBulkDeleteModal(){
  if(this.deleteServiceId!=''){
    if(!this.action || this.action == 0){
      return
    }
    $('#deletebulkModal').modal({
      show : true,
      backdrop : false
    })
  }
  else{
    this.commonService.infoToast("Please select vehicle to delete.")
  }
}

  closeDeleteModal(){
    $('#deleteModal').modal('hide')
  }

  // delete product
  deleteService(){
    let url = `admin/deleteManyServiceArea`
    let data = {
        "serviceAreaId": this.deleteServiceId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url,data,1).subscribe(res=>{
      if(res.responseCode==200){
        for(let i = 0 ; i < this.checkbox.length ; i ++){
          this.checkbox[i] = false
        }
        this.getDeliveryVehicleList()
        this.deleteServiceId = []
        this.closeDeleteModal()
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

searchText(e) {
  console.log(e.target.value);
  

  // if (!e.target.value) {
  //   return
  // }
  let me = this
  this.search = e.target.value
  clearInterval(this.timer)
  this.timer = setTimeout(function () {
    me.currentPage = 1
    me.getDeliveryVehicleList();
  }, 2000);
}


changePage(e){
  this.currentPage = e
  this.selectAll = false
  let i = 0
    for(let item of this.listArray){
      this.checkbox[i] = false
      i++

      this.deleteServiceId = []
    }
  this.getDeliveryVehicleList()
 }

 addAdminId(id, e){
  console.log(id, e.target.checked);
  if ( e.target.checked) {
    this.deleteServiceId.push(id);
  } else {
    this.deleteServiceId.splice(this.deleteServiceId.indexOf(id), 1);
  }
  console.log(this.deleteServiceId);
}
checkbox : any =[]
addMultipleId(e){
  this.deleteServiceId = []
  if(e.target.checked){
    let i = 0
    for(let item of this.listArray){
      this.checkbox[i] = true
      i++
      this.deleteServiceId.push(item?._id)
    }
  }
  else{
    let i = 0
    for(let item of this.listArray){
      this.checkbox[i] = false
      i++
      this.deleteServiceId.push(item?._id)
    }
    
    this.deleteServiceId = []
  }
  console.log(this.deleteServiceId);
  
}

addRow(e){
  
  this.pageSize = e.target.value
  this.currentPage = 1
  this.getDeliveryVehicleList()
  
}

viewVehicle(id){
  this.router.navigate(['setting/delivery-vehicle-view'],{queryParams:{id:id}})
}

editVehicle(id){
  this.router.navigate(['setting/edit-service-area'],{queryParams:{id:id}})
}

activeBlock(id){
  this.vehicleId = id
    $('#BlockModal').modal({
      show : true,
      backdrop : false
    })
  }

  blockvehicle(){
    let url = `admin/vehicleActiveBlock?_id=${this.vehicleId}`
    this.commonService.showSpinner()
    this.apiService.putApi(url,{},1).subscribe(res=>{
      if(res.responseCode==200){
        this.getDeliveryVehicleList()
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
