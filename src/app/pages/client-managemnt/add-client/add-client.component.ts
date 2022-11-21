import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService, CountryCode } from 'src/app/Services/common.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  clientFrom

  myControl = new FormControl('+91');
  filteredOptions: Observable<CountryCode[]>;
  countryList = []
  regExName=/^[a-zA-Z ]{3,}$/i;
  regExEmail=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
  regExPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  regExMobileNumber=/(?!0+$)[A-Z0-9][0-9]{7}/i;
  newPassword: boolean = true


  today=new Date('2002-12-30').toISOString().split('T')[0]
  constructor(private formbuilder:FormBuilder ,private apiService:ApiFunctionalityService,public common:CommonService, private router:Router) { }

  ngOnInit(): void {
    this.clientFrom=this.formbuilder.group({
      firstname:['',[Validators.required, Validators.pattern(this.regExName)]],
      lastname:['',[Validators.required, Validators.pattern(this.regExName)]],
      email:['',[Validators.required, Validators.pattern(this.regExEmail)]],
      number:['',[Validators.required, Validators.pattern(this.regExMobileNumber)]],
      dob:['',Validators.required],
      password:['',[Validators.required, Validators.pattern(this.regExPassword)]],
      confirmPassword:['',[Validators.required]],
      status : ['ACTIVE']
    })
    this.countryList = this.common.countryListJson;
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
/* -=-=-=-=-=-=-=-=- Add Client Api -=-=-=-=-=-=-=-=- */
  addClient(){
    let apiReqUrl="admin/addClient"
    var apiReqData = {
      "firstName":this.clientFrom.value.firstname,
      "surName":this.clientFrom.value.lastname,
      "mobileNumber":this.clientFrom.value.number,
      "countryCode":this.myControl.value,
      "email":this.clientFrom.value.email,
      "dateOfBirth": this.clientFrom.value.dob,
      "password": this.clientFrom.value.confirmPassword,
      "status1" :this.clientFrom.value.status,
    };
    console.log(apiReqData);  
    this.common.showSpinner()
    this.apiService.postApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
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

}
