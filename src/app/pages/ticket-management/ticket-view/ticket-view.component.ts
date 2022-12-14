import { Component, OnInit } from '@angular/core';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {
  userDetail: any;
  ProfileData: any = {userName : 'Surresh Mittal',email : 'suresh@gmail.com',updatedAt : new Date(),message : 'Loream Ipsum',status : 'Resolved'}
  permissions:any
  imgSrc: any = 'assets/images/avatar-1.jpg';
  constructor(private apiService:ApiFunctionalityService, public commonService:CommonService) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(){
    return
    let url = `admin/getProfile`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe(res=>{
      if(res.responseCode==200){
        this.ProfileData=res.result
        this.imgSrc = res.result.profilePic
        this.permissions = res.result.permission
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
