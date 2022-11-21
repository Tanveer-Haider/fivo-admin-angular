import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
  dropdownList: any = [];
  selectedItems = [];
  discountForm
  materialDropDownSetting: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'item',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  }
  dropdownSettings: IDropdownSettings = {};
  // list: any[];

  constructor(private formbuilder: FormBuilder, private apiSevice: ApiFunctionalityService, public commonService: CommonService, private router: Router) {
    console.log(this.commonService.todayDate());
    // this.list =
    //   [
    //     {
    //       "category": {
    //         "_id": "61dc0821555c14fb8b646bdf",
    //         "categoryName": "rtyre",
    //         "categoryType": "MATERIAL",
    //         "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //         "status": "ACTIVE",
    //         "metaKeyword": [
    //           "reyer"
    //         ],
    //         "createdAt": "2022-01-10T10:19:13.811Z",
    //         "updatedAt": "2022-01-10T10:19:13.811Z",
    //         "__v": 0
    //       },
    //       "productCount": 2,
    //       "products": [
    //         {

    //           checked: false,
    //           "_id": "61dc19b7ebff5a99898a0800",
    //           "image": [
    //             "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641814454/pm8z0ihaaxbtnvkgmi23.png"
    //           ],
    //           "categoryId": {
    //             "_id": "61dc0821555c14fb8b646bdf",
    //             "categoryName": "rtyre",
    //             "categoryType": "MATERIAL",
    //             "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //             "status": "ACTIVE",
    //             "metaKeyword": [
    //               "reyer"
    //             ],
    //             "createdAt": "2022-01-10T10:19:13.811Z",
    //             "updatedAt": "2022-01-10T10:19:13.811Z",
    //             "__v": 0
    //           },
    //           "item": "wetewt",
    //           "brand": "ewtewt",
    //           "size": "reyery",
    //           "color": "rtyery",
    //           "metaKeyword": [
    //             "reyeryr"
    //           ],
    //           "unit": "ewt4",
    //           "stock": 45,
    //           "price": 46346,
    //           "sku": "ewt-wet-rty-reyery",
    //           "stockStatus": "ADEQUATE",
    //           "status": "ACTIVE",
    //           "createdAt": "2022-01-10T11:34:15.600Z",
    //           "updatedAt": "2022-01-10T15:50:16.114Z",
    //           "__v": 0,
    //           "discount": "100"
    //         },
    //         {
    //           checked: false,
    //           "_id": "61dc4c4bd9db96e74996357a",
    //           "image": [
    //             "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641827403/lialij8wdcot0fvjkc7r.png"
    //           ],
    //           "categoryId": {
    //             "_id": "61dc0821555c14fb8b646bdf",
    //             "categoryName": "rtyre",
    //             "categoryType": "MATERIAL",
    //             "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //             "status": "ACTIVE",
    //             "metaKeyword": [
    //               "reyer"
    //             ],
    //             "createdAt": "2022-01-10T10:19:13.811Z",
    //             "updatedAt": "2022-01-10T10:19:13.811Z",
    //             "__v": 0
    //           },
    //           "item": "Iphone",
    //           "brand": "Apple",
    //           "size": "100",
    //           "color": "Black",
    //           "metaKeyword": [
    //             "dsfs"
    //           ],
    //           "unit": "1",
    //           "stock": 99,
    //           "reorderLevel": 12,
    //           "price": 122,
    //           "sku": "App-Iph-Bla-100",
    //           "stockStatus": "LOW",
    //           "status": "ACTIVE",
    //           "createdAt": "2022-01-10T15:10:03.514Z",
    //           "updatedAt": "2022-01-10T16:16:58.350Z",
    //           "__v": 0,
    //           "discount": "100"
    //         }
    //       ]
    //     },
    //     {
    //       "category": {
    //         "_id": "61dc0821555c14fb8b646bdf",
    //         "categoryName": "cat 2",
    //         "categoryType": "MATERIAL",
    //         "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //         "status": "ACTIVE",
    //         "metaKeyword": [
    //           "reyer"
    //         ],
    //         "createdAt": "2022-01-10T10:19:13.811Z",
    //         "updatedAt": "2022-01-10T10:19:13.811Z",
    //         "__v": 0
    //       },
    //       "productCount": 2,
    //       "products": [
    //         {
    //           checked: false,
    //           "_id": "61dc19b7ebff5a99898a0800",
    //           "image": [
    //             "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641814454/pm8z0ihaaxbtnvkgmi23.png"
    //           ],
    //           "categoryId": {
    //             "_id": "61dc0821555c14fb8b646bdf",
    //             "categoryName": "rtyre",
    //             "categoryType": "MATERIAL",
    //             "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //             "status": "ACTIVE",
    //             "metaKeyword": [
    //               "reyer"
    //             ],
    //             "createdAt": "2022-01-10T10:19:13.811Z",
    //             "updatedAt": "2022-01-10T10:19:13.811Z",
    //             "__v": 0
    //           },
    //           "item": "wetewt",
    //           "brand": "ewtewt",
    //           "size": "reyery",
    //           "color": "rtyery",
    //           "metaKeyword": [
    //             "reyeryr"
    //           ],
    //           "unit": "ewt4",
    //           "stock": 45,
    //           "price": 46346,
    //           "sku": "ewt-wet-rty-reyery",
    //           "stockStatus": "ADEQUATE",
    //           "status": "ACTIVE",
    //           "createdAt": "2022-01-10T11:34:15.600Z",
    //           "updatedAt": "2022-01-10T15:50:16.114Z",
    //           "__v": 0,
    //           "discount": "100"
    //         },
    //         {
    //           checked: false,
    //           "_id": "61dc4c4bd9db96e74996357a",
    //           "image": [
    //             "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641827403/lialij8wdcot0fvjkc7r.png"
    //           ],
    //           "categoryId": {
    //             "_id": "61dc0821555c14fb8b646bdf",
    //             "categoryName": "rtyre",
    //             "categoryType": "MATERIAL",
    //             "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //             "status": "ACTIVE",
    //             "metaKeyword": [
    //               "reyer"
    //             ],
    //             "createdAt": "2022-01-10T10:19:13.811Z",
    //             "updatedAt": "2022-01-10T10:19:13.811Z",
    //             "__v": 0
    //           },
    //           "item": "Iphone",
    //           "brand": "Apple",
    //           "size": "100",
    //           "color": "Black",
    //           "metaKeyword": [
    //             "dsfs"
    //           ],
    //           "unit": "1",
    //           "stock": 99,
    //           "reorderLevel": 12,
    //           "price": 122,
    //           "sku": "App-Iph-Bla-100",
    //           "stockStatus": "LOW",
    //           "status": "ACTIVE",
    //           "createdAt": "2022-01-10T15:10:03.514Z",
    //           "updatedAt": "2022-01-10T16:16:58.350Z",
    //           "__v": 0,
    //           "discount": "100"
    //         }
    //       ]
    //     },
    //     {
    //       "category": {
    //         "_id": "61dc0821555c14fb8b646bdf",
    //         "categoryName": "cat4",
    //         "categoryType": "MATERIAL",
    //         "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //         "status": "ACTIVE",
    //         "metaKeyword": [
    //           "reyer"
    //         ],
    //         "createdAt": "2022-01-10T10:19:13.811Z",
    //         "updatedAt": "2022-01-10T10:19:13.811Z",
    //         "__v": 0
    //       },
    //       "productCount": 2,
    //       "products": [
    //         {
    //           checked: false,
    //           "_id": "61dc19b7ebff5a99898a0800",
    //           "image": [
    //             "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641814454/pm8z0ihaaxbtnvkgmi23.png"
    //           ],
    //           "categoryId": {
    //             "_id": "61dc0821555c14fb8b646bdf",
    //             "categoryName": "rtyre",
    //             "categoryType": "MATERIAL",
    //             "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //             "status": "ACTIVE",
    //             "metaKeyword": [
    //               "reyer"
    //             ],
    //             "createdAt": "2022-01-10T10:19:13.811Z",
    //             "updatedAt": "2022-01-10T10:19:13.811Z",
    //             "__v": 0
    //           },
    //           "item": "wetewt",
    //           "brand": "ewtewt",
    //           "size": "reyery",
    //           "color": "rtyery",
    //           "metaKeyword": [
    //             "reyeryr"
    //           ],
    //           "unit": "ewt4",
    //           "stock": 45,
    //           "price": 46346,
    //           "sku": "ewt-wet-rty-reyery",
    //           "stockStatus": "ADEQUATE",
    //           "status": "ACTIVE",
    //           "createdAt": "2022-01-10T11:34:15.600Z",
    //           "updatedAt": "2022-01-10T15:50:16.114Z",
    //           "__v": 0,
    //           "discount": "100"
    //         },
    //         {
    //           checked: false,
    //           "_id": "61dc4c4bd9db96e74996357a",
    //           "image": [
    //             "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641827403/lialij8wdcot0fvjkc7r.png"
    //           ],
    //           "categoryId": {
    //             "_id": "61dc0821555c14fb8b646bdf",
    //             "categoryName": "rtyre",
    //             "categoryType": "MATERIAL",
    //             "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //             "status": "ACTIVE",
    //             "metaKeyword": [
    //               "reyer"
    //             ],
    //             "createdAt": "2022-01-10T10:19:13.811Z",
    //             "updatedAt": "2022-01-10T10:19:13.811Z",
    //             "__v": 0
    //           },
    //           "item": "Iphone",
    //           "brand": "Apple",
    //           "size": "100",
    //           "color": "Black",
    //           "metaKeyword": [
    //             "dsfs"
    //           ],
    //           "unit": "1",
    //           "stock": 99,
    //           "reorderLevel": 12,
    //           "price": 122,
    //           "sku": "App-Iph-Bla-100",
    //           "stockStatus": "LOW",
    //           "status": "ACTIVE",
    //           "createdAt": "2022-01-10T15:10:03.514Z",
    //           "updatedAt": "2022-01-10T16:16:58.350Z",
    //           "__v": 0,
    //           "discount": "100"
    //         }
    //       ]
    //     },
    //     {
    //       "category": {
    //         "_id": "61dc0821555c14fb8b646bdf",
    //         "categoryName": "cat3",
    //         "categoryType": "MATERIAL",
    //         "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //         "status": "ACTIVE",
    //         "metaKeyword": [
    //           "reyer"
    //         ],
    //         "createdAt": "2022-01-10T10:19:13.811Z",
    //         "updatedAt": "2022-01-10T10:19:13.811Z",
    //         "__v": 0
    //       },
    //       "productCount": 2,
    //       "products": [
    //         {
    //           checked: false,
    //           "_id": "61dc19b7ebff5a99898a0800",
    //           "image": [
    //             "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641814454/pm8z0ihaaxbtnvkgmi23.png"
    //           ],
    //           "categoryId": {
    //             "_id": "61dc0821555c14fb8b646bdf",
    //             "categoryName": "rtyre",
    //             "categoryType": "MATERIAL",
    //             "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //             "status": "ACTIVE",
    //             "metaKeyword": [
    //               "reyer"
    //             ],
    //             "createdAt": "2022-01-10T10:19:13.811Z",
    //             "updatedAt": "2022-01-10T10:19:13.811Z",
    //             "__v": 0
    //           },
    //           "item": "wetewt",
    //           "brand": "ewtewt",
    //           "size": "reyery",
    //           "color": "rtyery",
    //           "metaKeyword": [
    //             "reyeryr"
    //           ],
    //           "unit": "ewt4",
    //           "stock": 45,
    //           "price": 46346,
    //           "sku": "ewt-wet-rty-reyery",
    //           "stockStatus": "ADEQUATE",
    //           "status": "ACTIVE",
    //           "createdAt": "2022-01-10T11:34:15.600Z",
    //           "updatedAt": "2022-01-10T15:50:16.114Z",
    //           "__v": 0,
    //           "discount": "100"
    //         },
    //         {
    //           checked: false,
    //           "_id": "61dc4c4bd9db96e74996357a",
    //           "image": [
    //             "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641827403/lialij8wdcot0fvjkc7r.png"
    //           ],
    //           "categoryId": {
    //             "_id": "61dc0821555c14fb8b646bdf",
    //             "categoryName": "rtyre",
    //             "categoryType": "MATERIAL",
    //             "categoryImage": "https://res.cloudinary.com/mobiloitte-testing1/image/upload/v1641809953/ofhg1vjvzmpfbeoyvs6g.png",
    //             "status": "ACTIVE",
    //             "metaKeyword": [
    //               "reyer"
    //             ],
    //             "createdAt": "2022-01-10T10:19:13.811Z",
    //             "updatedAt": "2022-01-10T10:19:13.811Z",
    //             "__v": 0
    //           },
    //           "item": "Iphone",
    //           "brand": "Apple",
    //           "size": "100",
    //           "color": "Black",
    //           "metaKeyword": [
    //             "dsfs"
    //           ],
    //           "unit": "1",
    //           "stock": 99,
    //           "reorderLevel": 12,
    //           "price": 122,
    //           "sku": "App-Iph-Bla-100",
    //           "stockStatus": "LOW",
    //           "status": "ACTIVE",
    //           "createdAt": "2022-01-10T15:10:03.514Z",
    //           "updatedAt": "2022-01-10T16:16:58.350Z",
    //           "__v": 0,
    //           "discount": "100"
    //         }
    //       ]
    //     }

    //   ]

    // console.log(this.list);
  }

  ngOnInit(): void {
    this.discountForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      service: [''],
      material: [''],
      discount: ['', [Validators.required]],
      status: [''],

    })
    this.dropdownList = [
      { item_id: 1, item_text: 'Bike' },
      { item_id: 2, item_text: 'Open Van' },
      { item_id: 3, item_text: 'Light truck' },
      { item_id: 4, item_text: 'Heavy duty truck' },
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Electrician' },
      { item_id: 4, item_text: 'Navsari' }
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
    this.getAllServiceList()
    this.getAllMaterialList()
  }
  // serviceList: any = []
  // getAllServiceList() {
  //   let url = "service/listServiceWithoutPagination"
  //   this.commonService.showSpinner()
  //   this.apiSevice.getApi(url, 1).subscribe((res) => {

  //     // this.serviceList = res.result
  //     let i = 0
  //     for (let item of res.result) {
  //       this.serviceList[i] = { item_id: item?._id, item_text: item?.description }
  //       i++
  //     }
  //     console.log(this.serviceList);


  //     this.commonService.hideSpinner()
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

  // materialList: any = []
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
    // var materialItemId = []
    // let i = 0
    // for (let item of this.discountForm.value.material) {
    //   materialItemId[i] = item?._id
    //   i++
    // }
    // if (this.serviceId.length == 0 && materialItemId.length == 0) {
    //   this.commonService.errorToast("Either Material or Service is required")
    //   return
    // }
    let url = `admin/addDiscount`
    const data = {
      name: this.discountForm.value.name,
      amount: this.discountForm.value.discount,
      startDate: this.discountForm.value.startDate,
      endDate: this.discountForm.value.endDate,
      disCountType: this.discountType ? this.discountType : 'FLAT',
      // serviceId: this.serviceId,
      serviceId: serviceArrayList,
      // materialId: materialItemId,
      materialId: materialListArray,
      status1: this.discountForm.value.status ? "ACTIVE" : "BLOCKED",
    }
    console.log(data);

    this.commonService.showSpinner()
    this.apiSevice.postApi(url,data ,1).subscribe((res)=>{
      if(res.responseCode == 200){
        this.router.navigate(['/discount'])
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },(err)=>{
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.responseMessage)
    })
  }
  serviceId = []
  onServiceSelect(item: any) {
    this.serviceId.push(item.item_id)

    console.log(this.serviceId);
  }
  onServiceSelectAll(items: any) {
    let i = 0
    for (let item of items) {
      this.serviceId[i] = item.item_id
      i++
    }
    console.log(this.serviceId);
  }

  discountType: any
  selectType(tab) {
    this.discountType = tab
    this.discountForm.controls['discount'].reset()
  }

  onServiceDeSelect(item: any) {
    this.serviceId = this.serviceId.filter((res) => {
      return res != item.item_id
    })
    console.log(this.serviceId);

  }
  onDropDownClose() {
    if (!this.discountForm.value.service.length) {
      this.serviceId = []
    }


  }
  onMaterialSelect(item: any) {
    console.log(item);
  }
  onSelectAllMaterial(items: any) {
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
    console.log("shareIndividualCheckedList->", item);
    this.materialListArray = item
  }

  shareCheckUncheckAllProduct(item: []) {
    console.log("shareCheckUncheckAll->", item);
    this.materialListArray = item
  }
  checkUnCheckAllSubMenuProduct(item:[]){
    console.log("checkUnCheckAllSubMenu->",item);
    this.materialListArray = item
  }

  serviceArrayList: any = []
  // service
  shareIndividualCheckedListService(item: any[]) {
    console.log("shareIndividualCheckedList->", item);
    this.serviceArrayList = item
  }

  shareCheckUncheckAllService(item: []) {
    console.log("shareCheckUncheckAll->", item);
    this.serviceArrayList = item
  }
  checkUnCheckAllSubMenuService(item: []) {
    console.log("checkUnCheckAllSubMenu->", item);
    this.serviceArrayList = item
  }

}
