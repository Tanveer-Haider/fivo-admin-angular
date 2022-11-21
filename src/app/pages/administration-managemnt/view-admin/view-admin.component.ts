import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {
  addAdminFrom : FormGroup
  permissionArr: any = [
    "clientsManagement",
    "expertsManagement",
    "deliveryManagement",
    "inventoryManagement",
    "serviceManagement",
    "advertManagement",
    "jobManagement",
    "materialOrderManagement",
    "earnings",
    "categoryManagement",
    "couponManagement",
    "pushNotification",
    "autoNotifications",
    'reviews',
    "inbox",
    "settings"
  ];
  innerPermisstionArr : any = [
    {"clientsManagement" : ['View','Add','Edit','Delete']} ,
    {"expertsManagement" : ['View','Add','Edit','Delete']},
    {"deliveryManagement" : ['View','Add','Edit','Delete']},
    {"inventoryManagement": ['View','Add','Edit','Delete']},
    {"serviceManagement": ['View','Add','Edit','Delete']},
    {"advertManagement": ['View','Add','Edit','Delete']},
    {"jobManagement": ['View','Edit','Delete']},
    {"materialOrderManagement": ['View','Delete']},
    {"earnings": ['View']},
    {"categoryManagement": ['View','Add','Edit','Delete']},
    {"couponManagement": ['View','Add','Edit','Delete']},
    {"pushNotification": ['View','Delete']},
    {"autoNotifications" : ['View','Edit']},
    {"reviews" :['View']},
    {"inbox":['Delete']},
    {"settings":['View','Add','Edit','Delete']}
  ]
  name: any = []
  adminId : any
  constructor(private apiService: ApiFunctionalityService,private activatedRoute : ActivatedRoute ,private route:Router,private commonService : CommonService) { 
    this.activatedRoute.queryParams.subscribe(res => {
      this.adminId = res.id
    })
  }
  index = 0
  permArray = []
  ngOnInit(): void {
    for (let i of this.permissionArr) {

      this.name[this.index] = i.split(/(?=[A-Z])/).join(' ')
      this.permArray[this.index] = false
      this.index++
    }
    
    this.formValidation()
  }
  formValidation(){
    this.addAdminFrom = new FormGroup({
      userName : new FormControl('',[Validators.required]),
      name : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required,Validators.email]),
    })
    
    this.getAdmin()
  }
  temp : any = []
  getAdmin() {
    
    let url = "admin/subAdminView/"+this.adminId
    this.commonService.showSpinner()
  
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode == 200){
       this.addAdminFrom.patchValue({
        userName : res.result.userName,
        name : res.result.firstName,
        email : res.result.email

       })
       this.permission = res.result.permission
      
       
       this.commonService.hideSpinner()
      }else{
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
    },(err)=>{
      this.commonService.hideSpinner()
        this.commonService.errorToast(err.responseMessage)
    })
   
    
  }
  permission : any = {}
  checkPerm(permName, ch) {


  }
  innerPermArray : any = []
  permissionName = []
  addInsidePerm(permName,childPerm,ch,index?){
    permName = permName.replaceAll(" ","")

   
    
    if(this.permissionName.indexOf(permName) < 0){
      this.innerPermArray= []
    }
    
  
    this.permissionName.push(permName) 
   

    if(this.permission[permName]){
      this.innerPermArray = this.permission[permName]
    }

    if (ch.target.checked) {
      this.innerPermArray.push(childPerm)
    } else {
      this.innerPermArray.splice(this.innerPermArray.indexOf(childPerm), 1);
    }
    this.permission[permName] = this.innerPermArray
    if(this.innerPermArray.length != 0){
      this.permArray[index] = true
    }
    else{
      this.permArray[index] = false
    }
    

  }

  tempFunction(){
    
  }
}
