import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $ : any
@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  pageSize : any = 5
  total:any
  currentPage = 1
  search:any
  selectAll : any
  customerDataExcel:any=[]
  listArray : any = []
  AgentHeader:any = [
    {"id":1,"name":"All","backgroundColor":"bg-green","icon":"fa fa-users"},
    {"id":2,"name":"Active agents","backgroundColor":"bg-darkblue","icon":"fa fa-check"},
    {"id":3,"name":"Inactive agents","backgroundColor":"bg-lightessblack","icon":"fa fa-times"}
  ]
  constructor(private apiService:ApiFunctionalityService,public commonService:CommonService, private router:Router,private formbuilder:FormBuilder,private datepipe: DatePipe) {
    console.log("agent list component");
    // this.listArray=dummy
    
   }

  ngOnInit(): void {
    this.deliveryList()
    this.agentDashboard()
  }
  status : any = "ALL"
  filterStatus(e){
    this.status = e
    this.currentPage = 1
    console.log(e);
    
    this.deliveryList()
  }
  /* -=-=-=-=-=-=- Api of client List -=-=-=-=-=-==-=-= */
  deliveryList(){
    let apiReqUrl=`admin/listAgent`
    var apiReqData = {
      'page':String(this.currentPage),
      'limit':String(this.pageSize),
      'search':this.search,
      'status1' : this.status == 'ALL' ? '' : this.status 
    }
    // apiReqData.append(
    // apiReqData.append('search',String(this.search))
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
     if(res.responseCode==200){
       // console.log(res.result.docs);
       this.listArray = res.result.docs
       this.total = res.result.total
       this.commonService.hideSpinner()
      //  this.commonService.successToast(res.responseMessage)
     }
     else{
       this.commonService.hideSpinner()
       this.commonService.errorToast(res.responseMessage)
     }
    },(err)=>{
      this.listArray=[]
    })
   }
  //  open modal to delete admin
  deleteAdminId : any = []
  openDeleteModal(id){
    this.deleteAdminId = []
    this.deleteAdminId[0] = id
    $('#deleteModal').modal({
      show : true,
      backdrop : false
    })
  }
  action : any = 0
  openBulkDeleteModal(){
    if(this.deleteAdminId!=''){
      if(!this.action || this.action == 0){
        return
      }
      $('#deleteModal').modal({
        show : true,
        backdrop : false
      })
    }
    else{
      this.commonService.infoToast("Please select agent to delete.")
    }
  }
  changePage(e){
    this.currentPage = e
    this.selectAll = false
    let i = 0
      for(let item of this.listArray){
        this.checkbox[i] = false
        i++

        this.deleteAdminId = []
      }
    this.deliveryList()
   }
  deleteAdmin(){
    let url = `admin/deleteAgent?_id=${this.deleteAdminId[0]}`
      var data = {
        agentId : this.deleteAdminId 
      }    
    this.commonService.showSpinner()
    this.apiService.deleteApi(url,data,1).subscribe((res)=>{
      if(res.responseCode == 200){
        for(let i = 0 ; i < this.checkbox.length ; i ++){
          this.checkbox[i] = false
        }
        this.deliveryList()
        this.deleteAdminId = []
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      }else{
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }
  addAdminId(id, e){
    console.log(id, e.target.checked);
    if ( e.target.checked) {
      this.deleteAdminId.push(id);
    } else {
      this.deleteAdminId.splice(this.deleteAdminId.indexOf(id), 1);
    }
    console.log(this.deleteAdminId);
  }
  checkbox : any =[]
  addMultipleId(e){
    this.deleteAdminId = []
    if(e.target.checked){
      let i = 0
      for(let item of this.listArray){
        this.checkbox[i] = true
        i++
        this.deleteAdminId.push(item?._id)
      }
    }
    else{
      let i = 0
      for(let item of this.listArray){
        this.checkbox[i] = false
        i++
        this.deleteAdminId.push(item?._id)
      }
      
      this.deleteAdminId = []
    }
    console.log(this.deleteAdminId);
    
  }
  addRow(e){
  
    this.pageSize = e.target.value
    this.currentPage = 1
    this.deliveryList()
    
  }
 timer : any
  searchText(e) {
    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 0
      me.deliveryList();
    }, 2000);
  }
  navigateEdit(id){
    this.router.navigate([`/delivery/edit-agent/${id}`])
  }
  navigateView(id){
    this.router.navigate([`/delivery/view-agent/${id}`])
  }
    //------------------ export as excel for download file --------------//
    exportAsXLSX() {
      let apiReqBody = {
        'search': this.search,
        'limit':this.total
      };

      let apiReqUrl=`admin/listAgent`
      this.apiService.postFormDataApi(apiReqUrl,apiReqBody, 1).subscribe((res:any) => {
          if (res.responseCode == 200) {
            this.customerDataExcel = res.result.docs;
            let dataArr = []; 
            this.customerDataExcel.forEach((element, ind) => {
              let obj = {};
              obj = {
                "Agent Name": element.firstName + '' + element.surName ? element.firstName + '' + element?.surName  : "--",
                "Phone Number": element.mobileNumber ? element.mobileNumber : "--",
                "Vehicle Type": element.vehicleType[0].vehicleType ?  element.vehicleType[0].vehicleType : "--",
                "completed Deliveries": element.completedDeliveries ? element.completedDeliveries  : "--",
                "Status": element.status ? element.status : "--",
                "Last login Date": element.createdAt? this.datepipe.transform(element.createdAt, "medium"): "--",
              };
            let array=  dataArr.push(obj);   
            }); 
            this.commonService.exportAsExcelFile(dataArr, "Agent Management");         
          }
        })
    }

   //  expert dashboard
   dashboard:any
   agentDashboard(){
   let url = "admin/agentDashbord"
 this.commonService.showSpinner()
 this.apiService.getApi(url,1).subscribe((res)=>{
 if(res.responseCode == 200){
   this.dashboard = res.result
  //  this.commonService.successToast(res.responseMessage)
   this.commonService.hideSpinner()
 }else{
   this.commonService.errorToast(res.responseMessage)
   this.commonService.hideSpinner()
 }
 })
  }

  assending : boolean = true
  sorting(){
    if(this.assending){
     this.listArray =  this.listArray.sort((a,b)=>{
       let a1 = Date.parse(a.createdAt)
       let a2 = Date.parse(b.createdAt)
       return a1 - a2
        
      })
      this.assending = false

    }
    else{
     this.listArray = this.listArray.sort((a,b)=>{
      let a1 = Date.parse(a.createdAt)
      let a2 = Date.parse(b.createdAt)
      return a2 - a1
      })
      this.assending = true
    }
    
    console.log(this.listArray);
    
  }
}
