import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService, CountryCode } from 'src/app/Services/common.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  clientFrom
  editId:any
  myControl = new FormControl('+91');
  filteredOptions: Observable<CountryCode[]>;
  countryList = []
  regExName=/^[a-zA-Z ]{3,}$/i;
  regExEmail=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
  regExPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  regExMobileNumber=/(?!0+$)[A-Z0-9][0-9]{7}/i;


  today=new Date('2002-12-30').toISOString().split('T')[0]
  constructor(private formbuilder:FormBuilder,private apiService:ApiFunctionalityService,public common:CommonService, private router:Router ,private activateRoute:ActivatedRoute) { 
    this.editId=this.activateRoute.snapshot.paramMap.get("id")

  }

  ngOnInit(): void {
    this.clientFrom=this.formbuilder.group({
      firstname:['',[Validators.required, Validators.pattern(this.regExName)]],
      lastname:['',[Validators.required, Validators.pattern(this.regExName)]],
      email:['',[Validators.required, Validators.pattern(this.regExEmail)]],
      number:['',[Validators.required, Validators.pattern(this.regExMobileNumber)]],
      dob:['',Validators.required],
      status : ['',Validators.required]
      // password:['',Validators.required],
      // confirmPassword:['',Validators.required],
    })
    console.log(this.clientFrom);
    this.countryList = this.common.countryListJson;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filter(value) : this.countryList.slice())),
    );
    this.getClient()
  }
  private _filter(value: string): CountryCode[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter(option => option.code.toLowerCase().includes(filterValue));
    // return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));

  }
/* -=-=-=-=-=-=-=- Edit client -=-=-=-=-=-=-=-=-=-- */

editClient(){
  let apiReqUrl=`admin/editClient?_id=${this.editId}`
  var apiReqData = {
    "firstName":this.clientFrom.value.firstname,
    "surName":this.clientFrom.value.lastname,
    "mobileNumber":this.clientFrom.value.number,
    "countryCode":this.myControl.value,
    "email":this.clientFrom.value.email,
    "dateOfBirth": this.clientFrom.value.dob,
    "status1": this.clientFrom.value.status,
  };
  console.log(apiReqData);
  
  this.common.showSpinner()
  this.apiService.putApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
   if(res.responseCode==200){
     this.router.navigate(['/client'])
     this.common.hideSpinner()
     this.common.successToast(res.responseMessage)
   }
   else{
    this.common.hideSpinner()
    this.common.errorToast(res.responseMessage)
   }
  })
}


/* -=-=-=-=-=-=-=- Get client -=-=-=-=-=-=-=-=-=-- */

getClient(){
  let apiReqUrl=`admin/viewClient?_id=${this.editId}`
  this.common.showSpinner()
  this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
   if(res.responseCode==200){
     
    //  let date = new Date(res?.result?.dateOfBirth)
    //  console.log('------------>',res?.result?.dateOfBirth.replace(/\//g,'-'));
    
      this.clientFrom.patchValue({
        "firstname":res?.result?.firstName,
        "lastname":res?.result?.surName,
        "email":res?.result?.email,
        "number":res?.result?.mobileNumber,
        "dob":String(res?.result?.dateOfBirth).replace('/','-'),
        "status" : res?.result?.status,
      })    
      this.myControl.patchValue(res?.result?.countryCode)
     this.common.hideSpinner()
    //  this.common.successToast(res.responseMessage)
   }
   else{
    this.common.hideSpinner()
    this.common.errorToast(res.responseMessage)
   }
  })
}
}


