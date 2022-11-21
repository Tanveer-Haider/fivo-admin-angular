import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

declare var $;
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  productId:any
  pageSize : any = 5
  total:any
  categoryId:any
  currentPage = 1
  categories = []
  action : any = 0
  deleteServiceId : any = []
  timer : any

  customerDataExcel:any=[]
  search:any
  // checkbox : any =[]
  adminList : any  = []
  selectAll : any
  listArray : any = []
  productDashboard:any
  useCurrency : any = localStorage.getItem("useCurrency")

  AgentHeader:any = [
    {"name":"All","backgroundColor":"bg-green","icon":"fa fa-bars"},
    // {"id":2,"name":"Active agents","backgroundColor":"bg-darkblue","icon":"fa fa-check"},
    // {"id":3,"name":"Inactive agents","backgroundColor":"bg-lightessblack","icon":"fa fa-times"}
  ]

  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService, private router:Router, private datepipe: DatePipe) {
    console.log("product list component");
    
   }
  //  changePage(e){
  //   this.currentPage = e
  //  }
  ngOnInit(): void {
    this. getCategory()
    this.getServiceList()
    this.serviceDashboard()
  }

// get product list
getServiceList(){
  let data;
  let url = `service/listService`
    if(this.search){
      data = {
        'search': this.search,
        'page': String(this.currentPage),
        'limit' :String(this.pageSize)
      }
    }
    else if(this.categoryId){
      data = {
        'page': String(this.currentPage),
        'limit' :String(this.pageSize),
        'categoryId' :this.categoryId,
      }
    }
    else{
      data = {
        'page': String(this.currentPage),
        'limit' :String(this.pageSize)
      }
    }
  this.commonService.showSpinner()
  this.apiService.postApi(url,data,1).subscribe((res)=>{
    if(res.responseCode==200){
      this.listArray = res.result.docs
      this.total= res.result.total
      this.commonService.hideSpinner()
      // this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  },(err:any)=>{
    if(err){
      this.listArray=[]
    }
  })
}


openFilterModal(){
  $('#filterModal').modal('show')
}
selectCategory(item){
  this.categoryId = item.target.value
  console.log(this.categoryId);
}

filterList(){
  this.getServiceList()

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
    this.commonService.infoToast("Please select service to delete.")
  }
}

  closeDeleteModal(){
    $('#deleteModal').modal('hide')
  }

  // delete product
  deleteService(){
    let url = `service/deleteAllService`
    let data = {
        "serviceId": this.deleteServiceId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url,data,1).subscribe(res=>{
      if(res.responseCode==200){
        for(let i = 0 ; i < this.checkbox.length ; i ++){
          this.checkbox[i] = false
        }
        this.getServiceList()
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
    me.getServiceList();
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
  this.getServiceList()
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
  this.getServiceList()
  
}

  viewService(id){
    this.router.navigate(['services/view-service'],{queryParams:{id:id}})
  }

  editService(id){
    this.router.navigate(['services/edit-service'],{queryParams:{id:id}})
  }

     //------------------ export as excel for download file --------------//
     exportAsXLSX() {
      let apiReqBody = {
        'search': this.search,
        'limit':String(this.total)
      };

      let apiReqUrl=`service/listService`
      this.apiService.postApi(apiReqUrl,apiReqBody, 1).subscribe((res:any) => {
          if (res.responseCode == 200) {
            this.customerDataExcel = res.result.docs;
            let dataArr = []; 
            this.customerDataExcel.forEach((element, ind) => {
              let obj = {};
              obj = {
                "Category": element.categoryDetails?.categoryName  ? element.categoryDetails?.categoryName  : "--",
                "Description": element.description ? element.description : "--",
                "Unit": element.unit ? element.unit  : "--",
                "price": element.price ? element.price : "--",
                "Discount": element.discount+'%' ? element.discount+'%' : "--",
              };
            let array=  dataArr.push(obj);   
            }); 
            this.commonService.exportAsExcelFile(dataArr, "Service Management");         
          }
        })
    }
//  service dashboard
  dashboard:any
serviceDashboard(){
  let url = "admin/serviceDashboard"
this.commonService.showSpinner()
this.apiService.getApi(url,1).subscribe((res)=>{
if(res.responseCode == 200){
  this.dashboard = res.result
  // this.commonService.successToast(res.responseMessage)
  this.commonService.hideSpinner()
}else{
  this.commonService.errorToast(res.responseMessage)
  this.commonService.hideSpinner()
}
})

}

 // get category id
 getCategory(){
  let url = `category/listCategory`
  this.apiService.postApi(url,{},1).subscribe(res=>{
    if(res.responseCode==200){
      this.categories = res.result.docs
    }
    else{
      this.commonService.errorToast("Don't have categories.")
    }
  })
}
}
