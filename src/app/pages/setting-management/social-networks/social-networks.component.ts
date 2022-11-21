import { Component, OnInit } from '@angular/core';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.css']
})
export class SocialNetworksComponent implements OnInit {
  isSocialLink : any = []
  userData:any = []
  socialName : any
  socialLink:any = []
  socialId:any;
  temp =[{}]
  constructor(private apiService:ApiFunctionalityService, private commonService:CommonService) { }

  ngOnInit(): void {
    this.getSocialNetworks()
  }

getSocialNetworks(){
  let url = `admin/listSocialLink`
  this.commonService.showSpinner()
  this.apiService.getApi(url,1).subscribe((res)=>{
    if(res.responseCode==200){
      this.userData = res.result
      for(let i=0;i<this.userData.length;i++){
        this.isSocialLink[i]=false
       
        this.socialLink[i]=this.userData[i].socialLink
      }
      this.commonService.hideSpinner()
      // this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
}


 
updateSocialLink(link){
  if(!link){
    this.commonService.warningToast("Can't save empty link.")
    return
  }
   let url =`admin/editSocialLink?_id=${this.socialId}`
   let data = {
   socialName:this.socialName,
   socialLink:link,
   }
 console.log(url,data);
   // this.editable=true
   this.commonService.showSpinner()
   this.apiService.putApi(url,data,1).subscribe((res:any)=>{
     if (res.responseCode == 200) {
       // this.closeModel()
        this.getSocialNetworks()
       this.commonService.hideSpinner()
       this.commonService.successToast(res.responseMessage)
      
     } else {
       this.commonService.hideSpinner()
       this.commonService.errorToast("Data not found.")
     }
   })
 }
 socialLinks : any
 socialLinkEdit(i,socialLink,socialName,id){
   for(let i=0;i<this.userData.length;i++){
     this.isSocialLink[i]=false
   }
   this.isSocialLink[i] = true
   console.log(i,socialLink,socialName,id);
   this.socialName = socialName
   this.socialLinks = socialLink
   this.socialId = id
  
   // this.contactForm.reset()
 }

}
