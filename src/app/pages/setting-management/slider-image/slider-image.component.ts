import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $ : any
@Component({
  selector: 'app-slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.css']
})
export class SliderImageComponent implements OnInit {
  search:any
  pageSize : any = 10
  total = 10
  timer : any
  selectAll : any
  currentPage = 1
  action : any = 0
  deleteServiceId : any = []
  listArray : any = []
  bannerId:any
  AgentHeader:any = [
    {"id":1,"name":"All","backgroundColor":"bg-green","icon":"fa fa-bars"},
    
  ]
  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService,private router:Router) {
   
    
   }
  ngOnInit(): void {
    this.getBannerList()
  }


getBannerList(){
  let url = `admin/listBanner`
  this.commonService.showSpinner()
  this.apiService.getApi(url,1).subscribe((res)=>{
    if(res.responseCode==200){
      this.listArray = res.result
      this.total= res.result.total
      this.commonService.hideSpinner()
    }
    else{
      
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
  this.listArray=[]
  console.log(this.listArray);
}

activeBlock(id){
  this.bannerId = id
    $('#BlockModal').modal({
      show : true,
      backdrop : false
    })
  }



  blockvehicle(){
    let url = `admin/bannerActiveBlock?bannerId=${this.bannerId}`
    this.commonService.showSpinner()
    this.apiService.putApi(url,{},1).subscribe(res=>{
      if(res.responseCode==200){
        this.getBannerList()
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
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
    this.commonService.infoToast("Please select image to delete.")
  }
}
  closeDeleteModal(){
    $('#deleteModal').modal('hide')
  }

  // delete product
  deleteService(){
    let url = `admin/deleteManyBanner`
    let data = {
        "bannerId": this.deleteServiceId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url,data,1).subscribe(res=>{
      if(res.responseCode==200){
        this.getBannerList()
        for(let i = 0 ; i < this.checkbox.length ; i ++){
          this.checkbox[i] = false
        }
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
  

 
  let me = this
  this.search = e.target.value
  clearInterval(this.timer)
  this.timer = setTimeout(function () {
    me.currentPage = 1
    me.getBannerList();
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
  this.getBannerList()
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
  this.getBannerList()
  
}

editBanner(id){
  this.router.navigate(['/setting/edit-slider'],{queryParams:{id:id}})
}

}
