import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ApiFunctionalityService } from "src/app/Services/api-functionality.service";
import { CommonService } from "src/app/Services/common.service";

@Component({
  selector: "app-edit-coupon",
  templateUrl: "./edit-coupon.component.html",
  styleUrls: ["./edit-coupon.component.css"],
})
export class EditCouponComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  discountForm;
  serviceList = [];
  materialList = [];
  serviceDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: "_id",
    textField: "description",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  materialDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: "_id",
    textField: "item",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  discountId: any;
  constructor(
    private formbuilder: FormBuilder,
    private apiSevice: ApiFunctionalityService,
    public commonService: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.discountId = res.id;
    });
  }
  ngOnInit(): void {
    this.discountForm = this.formbuilder.group({
      name: ["", [Validators.required]],
      couponCode: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      service: [""],
      material: [""],
      discount: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      status: [""],
    });
    //  this.getAllServiceList()
    this.getAllServiceList();
    this.getAllMaterialList();
    setTimeout(() => {
      this.getDiscontDetail();
    }, 1000);
  }
  discountType: any = "";
  selectType(tab) {
    this.discountType = tab;
    this.discountForm.controls["discount"].reset();
  }

  // getAllServiceList(){
  //   let url = "service/listServiceWithoutPagination"
  //   this.commonService.showSpinner()
  //   this.apiSevice.getApi(url,1).subscribe((res)=>{

  //       this.serviceList = res.result

  //       this.getAllMaterialList()
  //       this.commonService.hideSpinner()
  //   })
  // }

  serviceArray: any = [];
  getAllServiceList() {
    let serviceArray = [];
    let url = "category/serviceCategoryListWithoutPagination";
    this.commonService.showSpinner();
    this.apiSevice.getApi(url, 1).subscribe((res: any) => {
      // console.log(res)
      if (res.responseCode == 200) {
        serviceArray = res.result;
        // make custom request for multi select dropdown
        this.serviceArray = serviceArray.map((element) => {
          return {
            category: {
              checked: false,
              categoryName: element.category.categoryName,
              // categoryType: element.category.categoryType
            },
            products: element.services.map((ele) => {
              return {
                checked: false,
                _id: ele._id,
                item: ele.description,
              };
            }),
          };
        });
        // console.log(this.serviceArray)
        this.commonService.hideSpinner();
      } else {
        this.serviceArray = [];
        this.commonService.hideSpinner();
      }
    });
  }

  // getAllMaterialList(){
  //   let url = "product/productListwithoutPagination"
  //   this.commonService.showSpinner()
  //   this.apiSevice.getApi(url,1).subscribe((res)=>{

  //       this.materialList = res.result

  //       console.log(this.serviceList);

  //       this.getDiscontDetail()
  //       this.commonService.hideSpinner()
  //   })
  // }
  materialArray = [];
  // get material list
  getAllMaterialList() {
    let materialArray = [];
    let url = "category/materialCategoryListWithoutPagination";
    this.commonService.showSpinner();
    this.apiSevice.getApi(url, 1).subscribe((res: any) => {
      // console.log(res)
      if (res.responseCode == 200) {
        materialArray = res.result;
        // make custom request for multi select dropdown
        this.materialArray = materialArray.map((element) => {
          return {
            category: {
              checked: false,
              categoryName: element.category.categoryName,
              // categoryType: element.category.categoryType
            },
            products: element.products.map((ele) => {
              return {
                checked: false,
                _id: ele._id,
                item: ele.item,
              };
            }),
          };
        });
        // console.log(this.materialArray)
        this.commonService.hideSpinner();
      } else {
        this.materialArray = [];
        this.commonService.hideSpinner();
      }
    });
  }

  // make sub menu checked for product
  isAllSelectedSubMenuProduct() {
    this.materialArray.forEach((element) => {
      let checkedBoxCount = 0;
      let checkedTrueCount = 0;
      checkedBoxCount =
        checkedBoxCount +
        element.products.filter((x) => x.checked == true).length;
      checkedTrueCount = checkedTrueCount + element.products.length;
      if (checkedBoxCount == checkedTrueCount) {
        element.category.checked = true;
      } else {
        element.category.checked = false;
      }
    });
    console.log(this.materialArray);
  }

  // make sub menu checked for service
  isAllSelectedSubMenuService() {
    this.serviceArray.forEach((element) => {
      let checkedBoxCount = 0;
      let checkedTrueCount = 0;
      checkedBoxCount =
        checkedBoxCount +
        element.products.filter((x) => x.checked == true).length;
      checkedTrueCount = checkedTrueCount + element.products.length;
      if (checkedBoxCount == checkedTrueCount) {
        element.category.checked = true;
      } else {
        element.category.checked = false;
      }
    });
    console.log(this.serviceArray);
  }

  getDiscontDetail() {
    let url = `admin/viewCoupon?_id=${this.discountId}`;
    this.commonService.showSpinner();
    this.apiSevice.getApi(url, 1).subscribe(
      (res) => {
        if (res.responseCode == 200) {
          // meterial
          this.materialArray.forEach((element) => {
            element.products.forEach((ele) => {
              let index = res.result.materialId.findIndex((x) => x == ele._id);
              if (index > -1) {
                ele.checked = true;
              }
            });
          });
          this.materialListArray = this.materialArray; // assign pre filled value
          // make sub menu checked
          this.isAllSelectedSubMenuProduct();

          // service
          this.serviceArray.forEach((element) => {
            element.products.forEach((ele) => {
              let index = res.result.serviceId.findIndex((x) => x == ele._id);
              if (index > -1) {
                ele.checked = true;
              }
            });
          });
          this.serviceArrayList = this.serviceArray; // assign pre filled value
          // make sub menu checked
          this.isAllSelectedSubMenuService();

          // var temp = []
          // var temp2 = []
          // let i = 0
          // let i2 = 0
          // var str2 = res.result.serviceId
          // temp = this.serviceList.filter((response)=>{
          //   return str2.includes(response?._id)
          // })
          // var str = res.result.materialId.toString()
          // temp2 = this.materialList.filter((response)=>{
          //   return str.includes(response?._id)
          // })
          this.discountType = res.result.disCountType;
          // console.log(temp2);

          this.discountForm.patchValue({
            name: res.result.name,
            startDate: res.result.startDate,
            endDate: String(res.result.endDate).split("T")[0],
            discount: res.result.amount,
            // service: temp,
            // material: temp2,
            couponCode: res.result.couponCode,
            status: res.result.status == "ACTIVE" ? true : false,
          });
          this.discountType = res.result.disCountType;
          // console.log(temp);

          this.commonService.hideSpinner();
          // this.commonService.successToast(res.responseMessage)
        } else {
          this.commonService.hideSpinner();
          this.commonService.errorToast(res.responseMessage);
        }
      },
      (err) => {
        this.commonService.hideSpinner();
        this.commonService.errorToast(err.responseMessage);
      }
    );
  }
  editDiscount() {
    // material
    var materialListArray = [];
    // console.log(this.materialListArray)
    this.materialListArray.forEach((element) => {
      element.products.forEach((ele) => {
        if (ele.checked == true) {
          materialListArray.push(ele._id);
        }
      });
    });
    // console.log(materialListArray);
    if (!materialListArray.length) {
      return this.commonService.errorToast("Atleast one material is required.");
    }

    // service
    var serviceArrayList = [];
    // console.log(this.serviceArrayList)
    this.serviceArrayList.forEach((element) => {
      element.products.forEach((ele) => {
        if (ele.checked == true) {
          serviceArrayList.push(ele._id);
        }
      });
    });
    // console.log(serviceArrayList);
    if (!serviceArrayList.length) {
      return this.commonService.errorToast("Atleast one service is required.");
    }

    // let i = 0
    // let index = 0
    // var serviceId = []
    // var materialId = []
    // for (let item of this.discountForm.value.service) {
    //   serviceId[i] = item?._id
    //   i++
    // }
    // for (let item of this.discountForm.value.material) {
    //   materialId[index] = item?._id
    //   index++
    // }
    let url = `admin/editCoupon?couponId=${this.discountId}`;
    const data = {
      name: this.discountForm.value.name,
      amount: this.discountForm.value.discount,
      startDate: this.discountForm.value.startDate,
      endDate: this.discountForm.value.endDate,
      disCountType: this.discountType,
      // serviceId: serviceId,
      serviceId: serviceArrayList,

      // materialId: materialId,
      materialId: materialListArray,

      couponCode: this.discountForm.value.couponCode,
      couponId: this.discountId,
      status1: this.discountForm.value.status ? "ACTIVE" : "BLOCKED",
    };
    console.log(data);

    this.commonService.showSpinner();
    this.apiSevice.postApi(url, data, 1).subscribe(
      (res) => {
        if (res.responseCode == 200) {
          this.router.navigate(["/coupons"]);
          this.commonService.hideSpinner();
          this.commonService.successToast(res.responseMessage);
        } else {
          this.commonService.hideSpinner();
          this.commonService.errorToast(res.responseMessage);
        }
      },
      (err) => {
        this.commonService.hideSpinner();
        this.commonService.errorToast(err.responseMessage);
      }
    );
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
  materialListArray: any = [];
  // no need
  // shareCheckedList(item: any[]) {
  //   this.materialListArray = item
  //   console.log("shareCheckedList->", item);
  // }
  shareIndividualCheckedListProduct(item: any[]) {
    // console.log("shareIndividualCheckedList->", item);
    this.materialListArray = item;
  }

  shareCheckUncheckAllProduct(item: []) {
    // console.log("shareCheckUncheckAll->", item);
    this.materialListArray = item;
  }
  checkUnCheckAllSubMenuProduct(item: []) {
    console.log("checkUnCheckAllSubMenu->", item);
    this.materialListArray = item;
  }

  serviceArrayList: any = [];
  // service
  shareIndividualCheckedListService(item: any[]) {
    // console.log("shareIndividualCheckedList->", item);
    this.serviceArrayList = item;
  }

  shareCheckUncheckAllService(item: []) {
    // console.log("shareCheckUncheckAll->", item);
    this.serviceArrayList = item;
  }
  checkUnCheckAllSubMenuService(item: []) {
    console.log("checkUnCheckAllSubMenu->", item);
    this.serviceArrayList = item;
  }
}
