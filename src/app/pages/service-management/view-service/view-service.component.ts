import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {
  dropdownList = [];
  serviceData:any
  metakey:any=[]
  serviceId:any
  dropdownSettings : IDropdownSettings= {};
  constructor(private apiService:ApiFunctionalityService, private commonService:CommonService,private rout:ActivatedRoute) {
    this.rout.queryParams.subscribe(res=>{
      this.serviceId = res.id
    })
   }

  ngOnInit(): void {
    this.getService()
    this.dropdownList = [
      { item_id: 1, item_text: 'Bike' },
      { item_id: 2, item_text: 'Open Van' },
      { item_id: 3, item_text: 'Light truck' },
      { item_id: 4, item_text: 'Heavy duty truck' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  // view service
  getService(){
    let url = `service/viewService?_id=${this.serviceId}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.serviceData = res.result
        this.metakey = res.result.metaKeyword
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
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
