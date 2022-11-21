import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-auto-notification',
  templateUrl: './view-auto-notification.component.html',
  styleUrls: ['./view-auto-notification.component.css']
})
export class ViewAutoNotificationComponent implements OnInit {
  data:any
  dropdownList = [];
  notificationId:any
  value:any
  notificationtype:any
  notificationData:any
  notificationForm
  dropdownSettings : IDropdownSettings= {};
  constructor(public sanitizer: DomSanitizer,private formbuilder:FormBuilder ,private apiService:ApiFunctionalityService,private commonServcie:CommonService, private router:Router ,public activatedRouter:ActivatedRoute) { 
    this.notificationId=this.activatedRouter.snapshot.paramMap.get("id")
    console.log(this.notificationId);
  }
  
  ngOnInit(): void {
    this.viewNotification()

    this.notificationForm=this.formbuilder.group({
      subject:['',[Validators.required]],
      receipient:['',[Validators.required]],
      emailSubject:['',[Validators.required]],
      status:['',[Validators.required]],
      message:['',[Validators.required]],
      type:new FormArray([]),
     })
    this.dropdownList = [
      { item_id: 1, item_text: 'Email' },
      { item_id: 2, item_text: 'APP' },
      { item_id: 3, item_text: 'Whatsapp' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  /* -=-=-=-=-=- view Notification -=-=-=-=-=-==-=- */
  viewNotification(){
    let apiReqUrl=`notification/viewNotification?notificationTypeId=${this.notificationId}`
    this.commonServcie.showSpinner()
    
    this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
     if(res.responseCode==200){
        this.notificationtype = res.result.autoNotifyType
        this.notificationData = res.result
        // this.value = res.result.emailBody
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