import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { filter } from 'rxjs/operators';
import { AuthServiceService } from './service-provider/auth-service.service';
import { ApiFunctionalityService } from './Services/api-functionality.service';
import { CommonService } from './Services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'any';
  currentUrl: any
  show: boolean = true
  // notFound:boolean=false
  constructor(private router: Router, public service: AuthServiceService, private bnIdle: BnNgIdleService, public commonService: CommonService,public apiService :ApiFunctionalityService) {

    router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: NavigationStart) => {
      if (event.url.includes('change-password')) {
        return !this.show
      }
    })

    

   
  }
  idletime = 0
    ngOnInit(): void {
    
    this.getSessonTime()
    this.getCurrencySymbol()
    }
    checkActivity(){
      var idleInterval = setInterval(() => {
        document.onmousemove = () => {
          this.idletime = 0
        }
        document.onkeydown = () => {
          this.idletime = 0
        }
        document.onkeyup = () => {
          this.idletime = 0
        }
        document.onmousedown = () => {
          this.idletime = 0
        }

        this.timerIncrement()
      }, 100000)
    }

    timerIncrement() {
      this.idletime = this.idletime + 1;

      if (this.idletime > this.sessonTime) { 
         this.commonService.onLogout()
      }
    }
    sessonTime : any
    getSessonTime() {
      let url = `admin/sessionView`
    
      this.commonService.showSpinner()
      this.apiService.getApi(url, 0).subscribe((res) => {
        if (res["responseCode"] == 200) {
          this.sessonTime = res.result.sessionTime
          this.commonService.sessonTime.next(res.result.sessionTime)
          this.checkActivity()
          this.commonService.hideSpinner()
        }
        else {
          this.commonService.hideSpinner()
        }
      }, (err) => {
        this.commonService.hideSpinner()
      })
    }

    getCurrencySymbol(){
      let url = `admin/viewCurrency`
      this.commonService.showSpinner()
      this.apiService.postApi(url,{},0).subscribe((res)=>{
        if(res.responseCode==200){
          localStorage.setItem('useCurrency',String(res.result.currencySymbol))
          
          
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
