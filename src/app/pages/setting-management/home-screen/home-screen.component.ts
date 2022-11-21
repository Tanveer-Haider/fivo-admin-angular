import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  itemsPerPage : any = 10
  total :any
  currentPage = 1
  homeScreenId:any
  imgSrc: string;
  listArray:any=[]
  constructor(private apiService:ApiFunctionalityService,public commonService:CommonService, private router:Router) {
    console.log("agent list component");
    // this.listArray=dummy
    if(localStorage.getItem('homeScreen')){
      localStorage.removeItem('homeScreen')
    }
   }
   changePage(e){

   }
  ngOnInit(): void {
    this.listHomeScreen()
  }

  listHomeScreen(){
    let apiReqUrl="admin/homeScreenList"
    this.commonService.showSpinner()
    this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
     if(res.responseCode==200){
      this.listArray=res.result
      this.total = this.listArray.length
      console.log(this.listArray.length,this.total);
      
       console.log(this.homeScreenId);
       
       this.commonService.hideSpinner()
      //  this.commonService.successToast(res.responseMessage)
     }
     else{
       this.commonService.hideSpinner()
       this.commonService.errorToast(res.responseMessage)
     }
    })
   }
   navigateEditHomeScreen(id,type,obj){
     localStorage.setItem('homeScreen',JSON.stringify(obj))
     this.router.navigate([`/setting/edit-home-Screen/${id}`],{queryParams : {type}})
  }

  openDeleteModal(){
    $('#deleteModal').modal({
      show : true,
      backdrop : false
    })
  }
}
