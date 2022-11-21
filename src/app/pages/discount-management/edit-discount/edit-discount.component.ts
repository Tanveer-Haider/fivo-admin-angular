import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ApiFunctionalityService } from "src/app/Services/api-functionality.service";
import { CommonService } from "src/app/Services/common.service";

@Component({
  selector: "app-edit-discount",
  templateUrl: "./edit-discount.component.html",
  styleUrls: ["./edit-discount.component.css"],
})
export class EditDiscountComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  discountForm;
  serviceList = [];
  disCountType2: any;
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
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      service: [""],
      material: [""],
      discount: ["", [Validators.required]],
      status: [""],
    });
    this.getAllServiceList();
    this.getAllMaterialList();
    setTimeout(() => {
      this.getDiscontDetail();
    }, 1000);
  }

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
  // getAllServiceList(){
  //   let url = "service/listServiceWithoutPagination"
  //   this.commonService.showSpinner()
  //   this.apiSevice.getApi(url,1).subscribe((res)=>{

  //       this.serviceList = res.result
  //       // let i = 0
  //       // for(let item of res.result){
  //       //   this.serviceList[i] = {item_id : item?._id, item_text : item?.description}
  //       //   i++
  //       // }
  //       // console.log(this.serviceList);

  //       this.getAllMaterialList()
  //       this.commonService.hideSpinner()
  //   })
  // }
  discountType: any;
  selectType(tab) {
    this.discountType = tab;
    this.discountForm.controls["discount"].reset();
  }

  // getAllMaterialList(){
  //   let url = "product/productListwithoutPagination"
  //   this.commonService.showSpinner()
  //   this.apiSevice.getApi(url,1).subscribe((res)=>{

  //       this.materialList = res.result
  //       // let i = 0
  //       // for(let item of res.result){
  //       //   this.materialList[i] = {item_id : item?._id, item_text : item?.item}
  //       //   i++
  //       // }
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

  // get discount details
  getDiscontDetail() {
    let url = `admin/viewDiscount?_id=${this.discountId}`;
    this.commonService.showSpinner();
    this.apiSevice.getApi(url, 1).subscribe(
      (res) => {
        // console.log(res);
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
          // temp = this.serviceList.filter((response) => {
          //   return str2.includes(response?._id)
          // })
          // var str = res.result.materialId.toString()
          // temp2 = this.materialList.filter((response) => {
          //   return str.includes(response?._id)
          // })
          // for (let item of this.materialList) {
          //   if (item?._id == res.result.materialId[i2]) {
          //     temp2[i2] = item
          //     i2++
          //   }

          // }
          // console.log(res.result);

          this.disCountType2 = res.result.disCountType;
          this.discountForm.patchValue({
            name: res.result.name,
            startDate: res.result.startDate,
            endDate: String(res.result.endDate).split("T")[0],
            discount: res.result.amount,
            // service: temp,
            // material: temp2,
            status: res.result.status == "ACTIVE" ? true : false,
          });

          // console.log(temp);

          // this.serviceList = res.result.serviceId
          // this.materialList = res.result.materialId
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

  // edit discount
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
    // for(let item of this.discountForm.value.service){
    //   serviceId[i] = item?._id
    //   i++
    // }
    // for(let item of this.discountForm.value.material){
    //   materialId[index] = item?._id
    //   index++
    // }
    // if(serviceId.length == 0 && materialId.length == 0){
    //   this.commonService.errorToast("Either Material or Service is required")
    //   return
    // }
    let url = `admin/editDiscount?discountId=${this.discountId}`;
    const data = {
      name: this.discountForm.value.name,
      amount: this.discountForm.value.discount,
      startDate: this.discountForm.value.startDate,
      endDate: this.discountForm.value.endDate,
      disCountType: this.discountType ? this.discountType : this.disCountType2,
      // serviceId :serviceId,
      serviceId: serviceArrayList,
      // materialId : materialId,
      materialId: materialListArray,

      status1: this.discountForm.value.status ? "ACTIVE" : "BLOCKED",
    };
    console.log(data);
    this.commonService.showSpinner();
    this.apiSevice.postApi(url, data, 1).subscribe(
      (res) => {
        if (res.responseCode == 200) {
          this.router.navigate(["/discount"]);
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

  onServiceSelect(item: any) {}
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
