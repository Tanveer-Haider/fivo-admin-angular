import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService ,CountryCode} from 'src/app/Services/common.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactUsForm : FormGroup
  regExEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;

  myControl = new FormControl('+91');
  filteredOptions: Observable<CountryCode[]>;
  countryList = []
  constructor(public commonService : CommonService,private apiService : ApiFunctionalityService,private router : Router) { }

  ngOnInit(): void {
    this.contactUsForm = new FormGroup({
      phone : new FormControl('',[Validators.required,Validators.minLength(7)]),
      email : new FormControl('',[Validators.required,Validators.pattern(this.regExEmail)]),
      webUrl : new FormControl('',[Validators.required,Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)]),
      address : new FormControl('',[Validators.required]),

    })
    this.phoneCntry()
    this.getContactUs()
  }
  
  phoneCntry(){
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

  getContactUs(){
    let url = "admin/contactUsView"
    this.commonService.showSpinner()
    this.apiService.getApi(url,0).subscribe((res)=>{
      if(res.responseCode == 200){
        this.contactUsForm.patchValue({
          phone : res.result.mobileNumber,
          email : res.result.email,
          webUrl : res.result.link,
          address : res.result.address,
          
        })
        this.myControl.patchValue(res.result.countryCode)

        
        
        this.commonService.hideSpinner()
      
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
  updateContactUs(){
    console.log(this.myControl);
    let url = "admin/editContactUs"
    const data = {
      email : this.contactUsForm.value.email,
      mobileNumber : this.contactUsForm.value.phone,
      address : this.contactUsForm.value.address,
      link : this.contactUsForm.value.webUrl,
      countryCode : this.myControl.value
    }
    this.commonService.showSpinner()
    this.apiService.postApi(url,data,0).subscribe((res)=>{
      if(res.responseCode == 200){
        this.router.navigate(['/static-content'])
        this.commonService.hideSpinner()
      
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
    
  }

}
