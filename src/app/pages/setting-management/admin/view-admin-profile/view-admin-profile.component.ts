import { Component, OnInit } from '@angular/core';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-admin-profile',
  templateUrl: './view-admin-profile.component.html',
  styleUrls: ['./view-admin-profile.component.css']
})
export class ViewAdminProfileComponent implements OnInit {
  userDetail: any;
  ProfileData: any = {userName : 'Admin',email : 'admin@gmail.com',countryCode : '+91', mobileNumber : '9999999999',address : 'Los Angeles'};
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
