import { Component, OnInit } from '@angular/core';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-automatic-logout-time',
  templateUrl: './automatic-logout-time.component.html',
  styleUrls: ['./automatic-logout-time.component.css']
})
export class AutomaticLogoutTimeComponent implements OnInit {
  selectlogoutsession: any = 30
  sessonTime: any
  constructor(private service: ApiFunctionalityService, public commonService: CommonService) { }
  idletime = 0
  ngOnInit(): void {
    this.commonService.sessonTime.subscribe((res)=>{
      this.sessonTime = res
     
    })
    // this.getSessonTime()
  }

 

  // getSessonTime() {
  //   let url = `admin/sessionView`
  //   // let apiReqData=new FormData();

  //   // apiReqData.append('sessionTime',this.selectlogoutsession)
  //   this.commonservice.showSpinner()
  //   this.service.getApi(url, 1).subscribe((res) => {
  //     if (res["responseCode"] == 200) {
  //       this.sessonTime = res.result.sessionTime
  //       this.commonservice.hideSpinner()
  //       this.commonservice.successToast(res["responseMessage"])
  //     }
  //     else {
  //       this.commonservice.hideSpinner()
  //       this.commonservice.errorToast(res["responseMessage"])
  //     }
  //   }, (err) => {
  //     this.commonservice.hideSpinner()
  //     this.commonservice.errorToast(err["responseMessage"])
  //   })
  // }
  selectTime(time) {
    console.log("timee------->", time.target.value);
    this.selectlogoutsession = time.target.value
  }
  logoutSession() {
    let url = `admin/sessionOut`
    // let apiReqData=new FormData();
    let apiReqData = {
      'sessionTime': this.selectlogoutsession
    };
    // apiReqData.append('sessionTime',this.selectlogoutsession)
    this.commonService.showSpinner()
    this.service.postApi(url, apiReqData, 1).subscribe((res) => {
      if (res["responseCode"] == 200) {
        window.location.reload()
        this.commonService.sessonTime.next(this.selectlogoutsession)
        this.commonService.hideSpinner()
        this.commonService.successToast(res["responseMessage"])
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res["responseMessage"])
      }
    }, (err) => {
      this.commonService.hideSpinner()
      this.commonService.errorToast(err["responseMessage"])
    })
  }
}
