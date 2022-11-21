import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService, CountryCode } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent implements OnInit {
  dropdownList = [];
  deliverylist =[]
  selectedItems = [];
  getAgentimage:any
  isDropdownDisabled=true
  getAgentData:any
  dropdownSettings : IDropdownSettings= {
    singleSelection: false,
    idField: '_id',
    textField: 'vehicleType',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };
  agentForm
  agentId:String

  myControl = new FormControl('+91');
  filteredOptions: Observable<CountryCode[]>;
  countryList = []
  constructor(private apiService:ApiFunctionalityService,public formbuilder:FormBuilder, public common:CommonService, private router:Router ,public activatedRoute:ActivatedRoute) { 
    this.agentId= this.activatedRoute.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.agentForm = this.formbuilder.group({
      agentType:[''],
      firstname:[''],
      surname:[''],
      companyName:[''],
      vechicleType:[''],
      commission:[''],
      NRCNumber:[''],
      registrationNumber:[''],
      address:[''],
      phoneNumber:[''],
      email:[''],
      username:[''],
      document:[''],
      password:[''],
      confirmPassword:[''],
      deliverFee : [''],
      status : ["ACTIVE"]
    })

    this.countryList = this.common.countryListJson;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filter(value) : this.countryList.slice())),
    );
    this.getDeliveryVehicleList()
    this.getAgent()
  }

  private _filter(value: string): CountryCode[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter(option => option.code.toLowerCase().includes(filterValue));
    // return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));

  }
  getDeliveryVehicleList(){
    let url = `admin/listVehicle`
    this.apiService.getApi(url,1).subscribe(res=>{
      if(res.responseCode==200){
        this.deliverylist = res.result

        this.common.hideSpinner()
      }
    })
  }
  /* -=-=-=-=-=-=-=- Get Agent -=-=-=-=-=-=-=-=-=-- */
  agentData : any 
  getAgent(){
    let apiReqUrl=`admin/viewAgent?_id=${this.agentId}`
    this.common.showSpinner()
    this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
     if(res.responseCode==200){
      this.agentData = res.result
     this.getAgentimage=res?.result?.verificationDocs
    var str2 = res.result.vehicleType 
    this.selectedItems = this.deliverylist.filter((response)=>{
        return str2.includes(response?._id)
      })
        this.agentForm.patchValue({
          agentType:res?.result?.agentType,
          firstname:res?.result?.firstName,
          surname:res?.result?.surName,
          companyName:res?.result?.companyName,
          vechicleType:this.selectedItems,
          commission:res?.result?.isCommission,
          NRCNumber:res?.result?.nrcNumber,
          registrationNumber:res?.result?.companyRegistrationNo,
          address:res?.result?.address,
          phoneNumber:res?.result?.mobileNumber,
          email:res?.result?.email,
          deliverFee : res?.result?.feeAmount,
          status : res?.result?.status
          // document:res?.result?.verificationDocs,
        })   
        this.myControl.patchValue(res?.result?.countryCode)   
        this.common.hideSpinner()

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
  length(n){
    return new Array(n)
  }
}
