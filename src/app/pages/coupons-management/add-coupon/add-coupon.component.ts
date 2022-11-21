import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  isDropdownDisabled = true
  couponForm
  serviceList = []
  discountType: any
  regExName = /^[a-zA-Z ]{3,}$/i;
  materialList = []
  serviceDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'description',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  materialDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'item',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  discountId: any
  constructor(private formbuilder: FormBuilder, private apiSevice: ApiFunctionalityService, public commonService: CommonService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.discountId = res.id
    })
  }
  ngOnInit(): void {
    this.couponForm = this.formbuilder.group({

      name: ['', [Validators.required, Validators.pattern(this.regExName)]],
      couponCode: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      service: [''],
      material: [''],
      discount: ['', [Validators.required]],
      // amount: ['', [Validators.required]],
      status: ['']
    })
    this.getAllServiceList()
    this.getAllMaterialList()

  }

  selectType(tab) {
    this.discountType = tab
    this.couponForm.controls['discount'].reset()
  }

  // getAllServiceList(){
  //   let url = "service/listServiceWithoutPagination"
  //   this.commonService.showSpinner()
  //   this.apiSevice.getApi(url,1).subscribe((res)=>{
  //       this.serviceList = res.result
  //       this.commonService.hideSpinner() 
  //   })
  // }
  serviceArray: any = []
  getAllServiceList() {
    let serviceArray = [];
    let url = "category/serviceCategoryListWithoutPagination"
    this.commonService.showSpinner()
    this.apiSevice.getApi(url, 1).subscribe((res: any) => {
      // console.log(res)
      if (res.responseCode == 200) {
        serviceArray = res.result
        // make custom request for multi select dropdown
        this.serviceArray = serviceArray.map(element => {
          return {
            category: {
              checked: false,

              categoryName: element.category.categoryName
              // categoryType: element.category.categoryType
            },
            products: element.services.map(ele => {
              return {
                checked: false,
                _id: ele._id,
                item: ele.description
              }
            })
          }
        })
        // console.log(this.serviceArray)
        this.commonService.hideSpinner()
      } else {
        this.serviceArray = []
        this.commonService.hideSpinner()
      }
    })
  }

  // getAllMaterialList(){
  //   let url = "product/productListwithoutPagination"
  //   this.commonService.showSpinner()
  //   this.apiSevice.getApi(url,1).subscribe((res)=>{
  //       this.materialList = res.result
  //       console.log(this.serviceList);
  //       this.commonService.hideSpinner() 
  //   })
  // }

  materialArray = []
  // get material list
  getAllMaterialList() {
    let materialArray = [];
    let url = "category/materialCategoryListWithoutPagination"
    this.commonService.showSpinner()
    this.apiSevice.getApi(url, 1).subscribe((res: any) => {
      // console.log(res)
      if (res.responseCode == 200) {
        materialArray = res.result
        // make custom request for multi select dropdown
        this.materialArray = materialArray.map(element => {
          return {
            category: {
              checked: false,

              categoryName: element.category.categoryName
              // categoryType: element.category.categoryType
            },
            products: element.products.map(ele => {
              return {
                checked: false,
                _id: ele._id,
                item: ele.item
              }
            })
          }
        })
        // console.log(this.materialArray)
        this.commonService.hideSpinner()
      } else {
        this.materialArray = []
        this.commonService.hideSpinner()
      }
    })
  }

  addDiscount() {
    // material
    var materialListArray = []
    // console.log(this.materialListArray)
    this.materialListArray.forEach(element => {
      element.products.forEach(ele => {
        if (ele.checked == true) {
          materialListArray.push(ele._id)
        }
      });
    });
    // console.log(materialListArray);
    if (!materialListArray.length) {
      return this.commonService.errorToast("Atleast one material is required.")
    }

    // service
    var serviceArrayList = []
    // console.log(this.serviceArrayList)
    this.serviceArrayList.forEach(element => {
      element.products.forEach(ele => {
        if (ele.checked == true) {
          serviceArrayList.push(ele._id)
        }
      });
    });
    // console.log(serviceArrayList);
    if (!serviceArrayList.length) {
      return this.commonService.errorToast("Atleast one service is required.")
    }
    // let i = 0
    // let index = 0
    // var serviceId = []
    // var materialId = []
    // for(let item of this.couponForm.value.service){
    //   serviceId[i] = item?._id
    //   i++
    // }
    // for(let item of this.couponForm.value.material){
    //   materialId[index] = item?._id
    //   index++
    // }
    let url = `admin/addCoupon`
    let data;
    if (this.discountType == 'PERCENTAGE') {
      data = {
        name: this.couponForm.value.name,
        couponCode: this.couponForm.value.couponCode,
        amount: this.couponForm.value.discount,
        startDate: this.couponForm.value.startDate,
        endDate: this.couponForm.value.endDate,
        disCountType: this.discountType,
        // serviceId :serviceId,
        serviceId: serviceArrayList,

        // materialId : materialId,
        materialId: materialListArray,

        status1: this.couponForm.value.status ? "ACTIVE" : "BLOCKED",
      }
    }
    else {
      data = {
        name: this.couponForm.value.name,
        couponCode: this.couponForm.value.couponCode,

        amount: this.couponForm.value.discount,
        startDate: this.couponForm.value.startDate,
        endDate: this.couponForm.value.endDate,
        disCountType: this.discountType,
        // serviceId :serviceId,
        serviceId: serviceArrayList,

        // materialId : materialId,
        materialId: materialListArray,

        status1: this.couponForm.value.status ? "ACTIVE" : "BLOCKED",
      }
    }
    console.log(data);

    this.commonService.showSpinner()
    this.apiSevice.postApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.router.navigate(['/coupons'])
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)

      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, (err) => {
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.responseMessage)
    })
  }
  onServiceSelect(item: any) {
    console.log(item);

  }
  onServiceSelectAll(item: any) {
    console.log(item);
  }
  onServiceDeSelect(items: any) {
    console.log(items);
  }


  // 

  materialListArray: any = []
  // no need
  // shareCheckedList(item: any[]) {
  //   this.materialListArray = item
  //   console.log("shareCheckedList->", item);
  // }
  shareIndividualCheckedListProduct(item: any[]) {
    // console.log("shareIndividualCheckedList->", item);
    this.materialListArray = item
  }

  shareCheckUncheckAllProduct(item: []) {
    // console.log("shareCheckUncheckAll->", item);
    this.materialListArray = item
  }
  checkUnCheckAllSubMenuProduct(item:[]){
    console.log("checkUnCheckAllSubMenu->",item);
    this.materialListArray = item
  }
  serviceArrayList: any = []
  // service
  shareIndividualCheckedListService(item: any[]) {
    // console.log("shareIndividualCheckedList->", item);
    this.serviceArrayList = item
  }

  shareCheckUncheckAllService(item: []) {
    // console.log("shareCheckUncheckAll->", item);
    this.serviceArrayList = item
  }
  checkUnCheckAllSubMenuService(item: []) {
    console.log("checkUnCheckAllSubMenu->", item);
    this.serviceArrayList = item
  }

}
