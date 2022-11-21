import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showLogo: boolean = false;
  showModal : boolean = false
  profileData:any = {userName : 'Admin'};

  constructor(private apiService:ApiFunctionalityService,private commonService:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.getProfile()
  }
  
  // head() {
  //   if (this.showLogo == false) {
  //     if ((document.getElementById("logo").style.width = "45px")) {
  //       document.getElementById("logo").style.display = "none";
  //       this.showLogo = true;
  //     }
  //   }
  //   else {
  //     document.getElementById("logo1").style.display = "none";
  //     this.showLogo = false;
  //   }
  // }

  // get admin profile
  getProfile(){
    return
    let url = `admin/getProfile`
    // this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res:any)=>{
      if(res.responseCode == 200){
        this.profileData = res.result
        console.log(this.profileData);
        
        // this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        // this.commonService.hideSpinner()
        // this.commonService.errorToast(res.responseMessage)
      }
    })
  }
 
  viewProfile(){
    this.router.navigate(['/setting/view-admin-profile'])
  }

  logout(){
    this.apiService.logout()
  }
  changePassword(){
    this.router.navigate(['change-password'])
  }
}
