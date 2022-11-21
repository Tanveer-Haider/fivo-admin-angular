import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService, CountryCode } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-expert',
  templateUrl: './view-expert.component.html',
  styleUrls: ['./view-expert.component.css']
})
export class ViewExpertComponent implements OnInit {
  expertForm
  viewId:any
  trades:any
  isDropdownDisabled = true;
  getExpertView:any
  serviceList=[]
  dropdownList = [];
  selectedItems = [];
  verificationImage:any
  dropdownSettings : IDropdownSettings= {
    singleSelection: false,
    idField: '_id',
    textField: 'description',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  myControl = new FormControl("+91");
  filteredOptions: Observable<CountryCode[]>;
  countryList = [];

  constructor(private formbuilder:FormBuilder,private apiService:ApiFunctionalityService,public common:CommonService, private router:Router,private activateRoute:ActivatedRoute) { 
    this.viewId=this.activateRoute.snapshot.paramMap.get("id")
    console.log(this.viewId);
  }

  ngOnInit(): void {
    this.expertForm=this.formbuilder.group({
      expertType:[''],
      firstname:[''],
      lastname:[''],
      companyName:[''],
      mobileNumber:[''],
      username:[''],
      NRC_Number:[''],
      registrationNumber:[''],
      address:[''],
      email:[''],
      status:['ACTIVE'],
      trade:[''],
      commissionPercent:[''],
      // Commision:[''],
      password:[''],
      confirmPassword:[''],
      expertFee : [''],
      
     })
     this.dropdownList = [
    ];
    
    this.countryList = this.common.countryListJson;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => (value ? this._filter(value) : this.countryList.slice()))
    );
    this.getAllServiceList()
    this.getExpert()

  }

  private _filter(value: string): CountryCode[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter((option) =>
      option.code.toLowerCase().includes(filterValue)
    );
    // return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));
  }
  getAllServiceList(){
    let url = "service/listServiceWithoutPagination"
    this.common.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{    
        this.serviceList = res.result
        this.common.hideSpinner() 
    })
  }
    /* -=-=-=-=-=-=-=- Get expert -=-=-=-=-=-=-=-=-=-- */

    getExpert(){
      let apiReqUrl=`admin/viewExpert/${this.viewId}`
      this.common.showSpinner()
      this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{

          if(res.responseCode==200){
            var str2 = res.result.trade 
            this.selectedItems = this.serviceList.filter((response)=>{
                return str2.includes(response?._id)
              })
            this.getExpertView=res.result
            this.expertForm.patchValue({
              expertType:res?.result?.expertType,
              firstname:res?.result?.firstName,
              lastname:res?.result?.surName,
              username:res?.result?.userName,
              companyName:res?.result?.companyName,
              mobileNumber:res?.result?.mobileNumber,
              registrationNumber:res?.result?.companyRegistrationNo,
              address:res?.result?.address,
              email:res?.result?.email,
              commissionPercent:res?.result?.commission,
              trade:this.selectedItems,
              expertFee:res?.result.feeAmount,
              status : res?.result.status
            })  
            this.verificationImage = res.result.verificationDocs
            this.trades = res.result.trade
        //  console.log(this.expertForm);     
        //  console.log(this.expertForm);  
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
    
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
