import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService, CountryCode } from 'src/app/Services/common.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
addAdminFrom : FormGroup
myControl = new FormControl('+91');
filteredOptions: Observable<CountryCode[]>;
countryList = []

  permissionArr: any = [

    "userManagement",
    "sliderManagement",
    "staticManagement",
    
  ];
  innerPermisstionArr : any = [
    {"userManagement" : ['View','Add','Edit','Delete']} ,
    {"sliderManagement" : ['View','Add','Edit','Delete']},
    {"staticManagement" : ['View','Add','Edit','Delete']},
   
  ]
  name: any = []
  regExName=/^[a-zA-Z ]{3,}$/i;
  regExEmail=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
  regExPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  regExMobileNumber=/(?!0+$)[A-Z0-9][0-9]{9,16}/i;

  constructor(private apiService: ApiFunctionalityService, private router : Router,public commonService : CommonService) { }
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
      email : new FormControl('',[Validators.required, Validators.pattern(this.regExEmail)]),
      number : new FormControl('',[Validators.required, Validators.pattern(this.regExMobileNumber)]),
      password : new FormControl('',[Validators.required, Validators.pattern(this.regExPassword)]),

      confirmPassword : new FormControl('',[Validators.required])
    })
    this.countryList = this.commonService.countryListJson;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filter(value) : this.countryList.slice())),
    );
    
  }
  private _filter(value: string): CountryCode[] {
    const filterValue = value.toLowerCase();
    
    return this.countryList.filter(option => option.code.toLowerCase().includes(filterValue));

  }
  addAdmin() {
    return
    let url = "admin/addSubAdmin"
    const data = {
      "name": this.addAdminFrom.value.name,
      "userName": this.addAdminFrom.value.userName,
      "email": this.addAdminFrom.value.email,
      "mobileNumber":this.addAdminFrom.value.number,
      "password": this.addAdminFrom.value.password,
      "confirmPassword":this.addAdminFrom.value.confirmPassword,
     
      "permission": this.permission,
      "countryCode": this.myControl.value,


    }
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
  addInsidePerm(permName,childPerm,ch,index){
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
  allAsset(e){
    if(e.target.checked){
      this.permission = {}
      let innerArray = ["Add","Edit","View","Delete"]
      for(let item of this.permissionArr){
        this.permission[item] = innerArray
      }
    }
    else{
      this.permission = {}
    }
    
  }
 
}
