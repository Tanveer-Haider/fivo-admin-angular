import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-edit-auto-notification',
  templateUrl: './edit-auto-notification.component.html',
  styleUrls: ['./edit-auto-notification.component.css']
})
export class EditAutoNotificationComponent implements OnInit {
  data:any
  dropdownList = [];
  notificationId:any
  notificationForm
  notificationData: any;
  dropdownSettings : IDropdownSettings= {};
  constructor(private formbuilder:FormBuilder ,private apiService:ApiFunctionalityService,private commonServcie:CommonService, private router:Router ,public activatedRouter:ActivatedRoute) { 
    this.notificationId=this.activatedRouter.snapshot.paramMap.get("id")
    console.log(this.notificationId);
  }
  
  ngOnInit(): void {


    this.notificationForm=this.formbuilder.group({
      subject:['',[Validators.required]],
      receipient:['',[Validators.required]],
      emailSubject:['',[Validators.required]],
      status:[''],
      message:['',[Validators.required]],
      notificationType : [''],
      type:new FormArray([]),
     })
    this.dropdownList = [
      {  item_text: 'Email' },
      { item_text: 'App' },
      {  item_text: 'Notification' },
      {  item_text: 'Whatsapp' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_text',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.viewNotification()
  }


      /* -=-=-=-=-=-=-=- edit EditNotification Api -=-=-=-=-=-=-=-=- */
      editNotification(){
        let apiReqUrl=`notification/editNotification?notificationId=${this.notificationId}`
        var type = []
        for(let item of this.notificationForm.value.notificationType){
          type.push(item.item_text)
        }
        var apiReqData = {
          "subject":this.notificationForm.value.subject,
          "receipient":this.notificationForm.value.receipient,
          "emailSubject":this.notificationForm.value.emailSubject,
          "status":this.notificationForm.value.status,
          "message":this.notificationForm.value.message,
          "autoNotifyType" : type,
        };
        console.log(apiReqData);
        
          this.commonServcie.showSpinner()
          this.apiService.putApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
           if(res.responseCode==200){
             this.router.navigate(['/auto-notification'])
             this.commonServcie.hideSpinner()
             this.commonServcie.successToast(res.responseMessage)
           }
           else{
            this.commonServcie.hideSpinner()
            this.commonServcie.errorToast(res.responseMessage)
           }
          })
      }
  /* -=-=-=-=-=- view Notification -=-=-=-=-=-==-=- */
  viewNotification(){
    let apiReqUrl=`notification/viewNotification?notificationTypeId=${this.notificationId}`
    this.commonServcie.showSpinner()
    
    this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
     if(res.responseCode==200){
       let dropdownL = []
       let i = 0
        for(let item of res.result.autoNotifyType){
          dropdownL[i] = {"item_text" : item}
          i++
        }
        this.notificationData =  res.result
        console.log(dropdownL);
        
        this.notificationForm.patchValue({
          subject:res?.result?.subject,
          receipient:res?.result?.receipient,
          emailSubject:res?.result?.emailSubject,
          // status:res?.result?.status,
          status: ((res.result.status == 'true') ? true : false),
          message:res?.result?.message,
          notificationType :dropdownL
        })  
        console.log(this.notificationForm);
        
        this.commonServcie.hideSpinner()
        // this.commonServcie.successToast(res.responseMessage)
     }
     else{

      this.commonServcie.hideSpinner()
      this.commonServcie.errorToast(res.responseMessage)
     }
    })
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}