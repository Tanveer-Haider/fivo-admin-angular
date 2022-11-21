import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {
  data: any;
  templateForm
  constructor(private formbuilder:FormBuilder,private apiService : ApiFunctionalityService, public commonService : CommonService,private router :Router) { }

  ngOnInit(): void {
    this.templateForm=this.formbuilder.group({
      notificationType: ['EMAIL',[Validators.required]],
      templateName: ['',[Validators.required]],
      subject:['',[Validators.required]],
      message:['',[Validators.required]],
      title : ['',[Validators.required]],
      sms : ['',[Validators.required]]
    })
  }
  addTemplate(){
    let url = "notification/addPushNotification"
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
    this.apiService.postApi(url,data,1).subscribe((res)=>{
      if(res.responseCode == 200){
        this.router.navigate(['/notification/template-list'])
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },(err)=>{
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.responseMessage)
    })
  }

}
