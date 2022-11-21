import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent implements OnInit {
  data:any
  templateForm
  id:any
  constructor(private formbuilder:FormBuilder,private apiService : ApiFunctionalityService,private activatedRoute : ActivatedRoute , public commonService : CommonService ,private route : Router) { 
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.id  = res.id
    })
  }
  
  ngOnInit(): void {
    this.templateForm=this.formbuilder.group({
      // notificationType: ['',Validators.required],
      // templateName: ['',Validators.required],
      // subject:['',Validators.required],
      // message:['',Validators.required]
      notificationType: ['EMAIL',[Validators.required]],
      templateName: ['',[Validators.required]],
      subject:['',[Validators.required]],
      message:['',[Validators.required]],
      // title : ['',[Validators.required]],
      sms : ['',[Validators.required]]
    })
    this.getNotification()
  }
  getNotification(){
    let url = "notification/viewNotification?notificationTypeId="+this.id
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode == 200){
        if(res.result.notificationType == 'EMAIL'){
          this.templateForm.patchValue({
            notificationType : res.result.notificationType,
            templateName : res.result.templateName,
            subject: res.result.emailSubject,
            message: res.result.emailBody,
            // title: res.result.notificationType,
            // sms: res.result.notificationType,
          })
        }else{
          this.templateForm.patchValue({
            notificationType : res.result.notificationType,
            templateName : res.result.templateName,
            // subject: res.result.emailSubject,
            // message: res.result.emailBody,
            // title: res.result.title,
            sms: res.result.message,
          })
        }
       
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },(err)=>{
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.responseMessage)
    })
  
  }
  editNotification(){
    let url = `notification/editNotification?notificationId=${this.id}`
    let data
    if(this.templateForm.value.notificationType == 'EMAIL'){
      data ={
        notificationType : this.templateForm.value.notificationType,
        templateName : this.templateForm.value.templateName,
        emailSubject : this.templateForm.value.subject,
        emailBody :  this.templateForm.value.message,
       
      }
    }
    else{
      data ={
        notificationType : this.templateForm.value.notificationType,
        templateName : this.templateForm.value.templateName,
       
        // title :  this.templateForm.value.title,
        message :  this.templateForm.value.sms
      }
    }
   
    this.commonService.showSpinner()
    this.apiService.putApi(url,data,1).subscribe((res)=>{
      if(res.responseCode == 200){
        this.commonService.hideSpinner()
        this.route.navigate(['/notification/template-list'])
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },(err)=>{
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.responseMessage)
    })
  
  }
  d

}
