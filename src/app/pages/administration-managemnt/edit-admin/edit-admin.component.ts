import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService, CountryCode } from 'src/app/Services/common.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  addAdminFrom : FormGroup
  myControl = new FormControl('+91');

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
  regExName=/^[a-zA-Z ]{3,}$/i;
  regExMobileNumber=/(?!0+$)[A-Z0-9][0-9]{9}/i;
  countryList = []
  filteredOptions: Observable<CountryCode[]>;

  adminId : any
  constructor(private apiService: ApiFunctionalityService,private activatedRoute : ActivatedRoute ,public commonService : CommonService,private router : Router) { 
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
      userName : new FormControl('',[Validators.required,Validators.minLength(3)]),
      name : new FormControl('',[Validators.required, Validators.pattern(this.regExName)]),
      email : new FormControl('',[Validators.required,Validators.email]),
      // password : new FormControl('',[Validators.required]),
      number : new FormControl('',[Validators.required, Validators.pattern(this.regExMobileNumber)]),

      // confirmPassword : new FormControl('',[Validators.required])
    })
    this.getAdmin()
    this.countryList = this.commonService.countryListJson;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filter(value) : this.countryList.slice())),
    );
  }
  private _filter(value: string): CountryCode[] {
    const filterValue = value.toLowerCase();
    
    return this.countryList.filter(option => option.code.toLowerCase().includes(filterValue));
    // return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));

  }
  temp : any = []
  allPermission : boolean = false
  getAdmin() {
    
    let url = "admin/subAdminView/"+this.adminId
    this.commonService.showSpinner()
  
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode == 200){
       this.addAdminFrom.patchValue({
        userName : res.result.userName,
        name : res.result.firstName,
        email : res.result.email,
        number : res.result.mobileNumber,
        countryCode:res.result.countryCode,

       })
       this.myControl.patchValue (res.result.countryCode)
       this.permission = res.result.permission

       var keys = Object.keys(res.result.permission)
      

     
       let i = 0
       for(let item of keys){
         if(this.permission[item]?.length == this.innerPermisstionArr[i][item]?.length){
          this.allPermission = true
         }
         else{
           this.allPermission = false
           break
         }
         i++
         
        //  if(this.permission[item].length)
        // this.permArray[i]
       }
       
       this.commonService.hideSpinner()
      //  this.commonService.successToast(res.responseMessage)
      }else{
        this.commonService.hideSpinner()
        // this.commonService.errorToast(res.responseMessage)
      }
    },(err)=>{
      this.commonService.hideSpinner()
        this.commonService.errorToast(err.responseMessage)
    })
   
    
  }
  editAdmin() {
    
    let url = "admin/editPermission?id="+this.adminId
    const data = {
      "name": this.addAdminFrom.value.name,
      "userName": this.addAdminFrom.value.userName,
      "email": this.addAdminFrom.value.email,
    
      "mobileNumber": this.addAdminFrom.value.number,
      // "confirmPassword":this.addAdminFrom.value.confirmPassword,
      "countryCode": this.myControl.value,
      "permission": this.permission
    }
    // return
    
    this.commonService.showSpinner()
    this.apiService.postApi(url,data,1).subscribe((res)=>{
      if(res.responseCode == 200){
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
        this.router.navigate(['/admin'])
      }else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
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
  allAsset(e){
    if(e.target.checked){
      this.permission = {}
      let innerArray = ["Add","Edit","View","Delete"]
      for(let item of this.permissionArr){
        this.permission[item] = innerArray
      }
    }
    else{
      this.permission = []
    }
    
  } 
}
