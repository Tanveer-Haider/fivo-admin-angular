import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  @ViewChild('placesRef', { static: true }) placesRef: GooglePlaceDirective;
  address: any
  orderId: any
  orderMaterialId: any
  orderDetail: any = []
  options: any = []
  fakeArray: any = []
  stars: number[] = [1, 2, 3, 4, 5];
  orderMaterialDetail: any = []
  pageSize: any = 5
  editOrder: boolean = true
  total: any
  currentPage = 0
  listArray: any = []
  discounts: any = [];
  isAssigned: boolean = false
  useCurrency : any = localStorage.getItem("useCurrency")
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiFunctionalityService, private commonService: CommonService,private router : Router) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.orderId = res.id
      this.orderMaterialId = res.id
    })

  }

  ngOnInit(): void {
    this.getOderDetail()
    this.getOderMaterialDetail()
    this.deliveryList()
    this.getCategoryList()
    this.getAddressList()
  }
  latitude : any = 0
  longitude : any = 0
  // addProductForm : FormGroup = new FormGroup({
  //   categoryName : new FormControl(0),
  //   itemName : new FormControl(0),
  //   brandName : new FormControl(0),
  //   colorName : new FormControl(0),
  //   sizeName : new FormControl(0),
  //   // categoryName : new FormControl(0),
  // })
  // public handleAddressChange(address: Address) {
  //   console.log(address);
  //   this.options = []
  //   this.address = address.formatted_address
  //   this.longitude = address.geometry.location.lng()
  //   this.latitude = address.geometry.location.lat()
  //   console.log(this.longitude,this.latitude);
    

  //   this.options[0] = Number(address.geometry.location.lat())
  //   this.options[1] = Number(address.geometry.location.lng())
  // }
  totalAmount: any = 0
  getOderDetail() {
    this.totalAmount = 0
    let url = "admin/orderView/" + this.orderId
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.orderDetail = res.result
        this.fakeArray = res.result
        this.address = res.result.area
        this.discounts = res.result.productId
        if (res.result.agent_Expert_Id) {
          this.isAssigned = true
        }

        if (res.result.orderType == 'PRODUCT') {
          this.getMaterialList()
        }
        else if (res.result.orderType == 'SERVICE') {
          this.getExpertList()
        }
        this.grandTotal = res.result.total
        for (let item of res.result.productId) {
          this.totalAmount += item.productDetails.price * item.quantity
        }
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
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
  expertList: any = []
  materialList: any = []
  serviceTotal: any = 0
  getExpertList() {
    let url = "admin/listExpert"
    const data = {
      page: 1,
      limit: 10
    }
    this.commonService.showSpinner()
    this.apiService.postApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.expertList = res.result.docs

        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
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
  getMaterialList() {
    let url = "product/productListwithoutPagination"
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.materialList = res.result
        this.tempMaterialList = res.result
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
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
  addressList : any = []
  getAddressList() {
    let url = "admin/listServiceArea"
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.addressList = res.result
       
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
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

  getOderMaterialDetail() {
    let url = "admin/pendingMaterialorderList"
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.orderMaterialDetail = res.result.results[0]
        this.commonService.hideSpinner()
        console.log(this.orderMaterialDetail);

        // this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, (err) => {
      this.commonService.hideSpinner()
      // this.commonService.errorToast(err.responseMessage)
    })

  }


  /* -=-=-=-=-=-=- Api of client List -=-=-=-=-=-==-=-= */
  deliveryList() {
    let apiReqUrl = "admin/listAgent"
    var apiReqData = new FormData();
    apiReqData.append('page', String(this.currentPage))
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        // console.log(res.result.docs);
        this.listArray = res.result.docs
        this.total = res.result.total
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }


  //  assign variable
  deliveragent: any = "61b98e66bf52ffe82a40bd78"
  // order  = this.orderId
  //  assign order by client

  assignOrder() {
    let apiReqUrl = ""
    let apiReqData ={}
    console.log(this.orderDetail.orderType)
    if(this.orderDetail.orderType == 'SERVICE'){
      apiReqUrl = "admin/reAssignOrderServiceToExperts"
      apiReqData = {
        expertId: this.orderMaterialId,
        orderId: this.orderId,
        serviceId : this.orderId
      }
    }else{
      apiReqUrl = "admin/assignOrderDeliveryAgent"
      apiReqData = {
      deliveryAgentId: this.orderMaterialId,
      orderId: this.orderId
    }
    }
    
    this.commonService.showSpinner()
    this.apiService.putApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        // console.log(res.result.docs);
        // this.listArray = res.result.docs
        // this.total = res.result.total
        $('#assignModal').modal('hide')
        $('#reAssignModal').modal('hide')
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  onCheckboxChange(event) {
    console.log(event);


  }
  assginAgentId: any
  getAgentId(id) {

    this.assginAgentId = id
  }
  openAssignModal() {
    if (!this.assginAgentId) {
      this.commonService.warningToast("Please select agent to assign order.")
      return
    }
    $('#assignModal').modal({
      show: true,
      backdrop: false
    })
  }
  openreAssignModal() {
    if(!this.assginAgentId){
      this.commonService.warningToast("Please Select delivery agent")
      return
    }
    $('#reAssignModal').modal({
      show: true,
      backdrop: false
    })
  }
  assginAgent() {
   console.log("agent")
    // let apiReqUrl = "admin/assignOrderDeliveryAgent"
    // let apiReqData = {
    //   deliveryAgentId: this.assginAgentId,
    //   orderId: this.orderId
    // }
    let apiReqUrl = ""
    let apiReqData ={}
    console.log(this.orderDetail.orderType)
    if(this.orderDetail.orderType == 'SERVICE' && this.orderDetail.agent_Expert_Id){
      apiReqUrl = "admin/reAssignOrderServiceToExperts"
      apiReqData = {
        expertId: this.assginAgentId,
        orderId: this.orderId,
        serviceId : this.orderDetail.serviceId[0]._id
      }
    }
   else if(this.orderDetail.orderType == 'SERVICE' && !this.orderDetail.agent_Expert_Id){
      apiReqUrl = "admin/assignOrderServiceToExperts"
      apiReqData = {
        expertId: this.assginAgentId,
        orderId: this.orderId,
        serviceId : this.orderDetail.serviceId[0]._id
      }
    }
    else{
      if(this.orderDetail.orderStatus != 'PENDING'){
        apiReqUrl = "admin/reAssignOrderDeliveryAgent"
        apiReqData = {
        deliveryAgentId: this.assginAgentId,
        orderId: this.orderId
      }
    }
      else{
        apiReqUrl = "admin/assignOrderDeliveryAgent"
        apiReqData = {
        deliveryAgentId: this.assginAgentId,
        orderId: this.orderId
        }
      
    }
    }
    this.commonService.showSpinner()
    this.apiService.putApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.getOderDetail()
        $('#assignModal').modal('hide')
        $('#reAssignModal').modal('hide')
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })

  }
  reAssginAgent() {
    this.isAssigned = false
    $('#reAssignModal').modal('hide')
  }
  editMaterialaOrder() {

  }
  openEditModal() {
    if(this.orderDetail.orderStatus == "CANCEL"){
      this.commonService.errorToast("Can not update cancel order")
      return
    }
    $('#editModal').modal('show')
  }
  closeEditModal() {
    
  }
  // Add and Remove Product

  addProduct(e, obj) {
    console.log(e, obj);
  
    if(!obj){
      if(this.finalList.length == 0){
     
        this.commonService.warningToast("Please select all field")
        return
      
      
    }
    else{
      obj = this.finalList[0]
    }
     
    }
    console.log("-=-=-=-=-",obj);
    
    let index = this.orderDetail.productId.findIndex(x => x._id == obj._id)
    if (e) {
   
      let temp = { productDetails: obj, quantity: 1, _id: obj?._id }
      // alert(this.orderDetail.productId.indexOf(obj._id))
      // if(this.orderDetail.productId.indexOf(obj._id) > 0){

      console.log(index)
      if (index > -1) {
        this.orderDetail.productId[index].quantity += 1

      } else {
        this.orderDetail.productId.push(temp);

      }
      console.log(this.orderDetail)


      // else{
      //   this.orderDetail.productId.push(temp);
      // }

    }
    else {
      console.log(index);

      this.orderDetail.productId.splice(index, 1);


    }
    this.calculatePrice()
    this.itemList = []
    this.brandList = []
    this.colorList = []
    this.sizeList = []
    this.finalList = []
    this.itemName = 0 
    this.brandName = 0
    this.colorName = 0
    this.sizeName = 0
  
    console.log(this.orderDetail);

  }
  
  udateQuantity(e,index){
    console.log(e.target.value,index);
    this.orderDetail.productId[index]["quantity"] = e.target.value
    this.calculatePrice()
  }
  grandTotal: any = 0
  calculatePrice() {
    this.grandTotal = 0
    this.totalAmount = 0
    for (let item of this.orderDetail.productId) {
      this.totalAmount += item.productDetails.price * item.quantity
      if(item.productDetails.disCountType == 'FLAT'){
      this.grandTotal += (item.productDetails.price * item.quantity) - (item.productDetails.discount)

      }else{
        this.grandTotal += (item.productDetails.price * item.quantity) - (item.productDetails.discount / 100) * (item.productDetails.price * item.quantity)

      }
      this.grandTotal += this.orderDetail.deliveryFee
    }
  }
  updateOrder() {
    let area = this.address ? String(this.address).split(',')[0] : this.orderDetail.area
    let cordinates = {}
    if(this.address){
      cordinates = {coordinates : [this.latitude,this.longitude],type : "Point"}
    }
    else{
      cordinates = this.orderDetail.location
    }
    let newOrderDetail = []
    var temp = {}

    for (let item of this.orderDetail.productId) {
      newOrderDetail.push({ "productDetails": item.productDetails._id, 'quantity': item.quantity })
    }
    temp["order_Id"] = this.orderId
    temp["quantity"] = this.orderDetail.quantity
    temp["area"] = area

    temp["total"] = this.grandTotal

    temp["deliveryVehicle"] = this.orderDetail.deliveryVehicle

    temp["deliveryFee"] = this.orderDetail.deliveryFee

    temp["location"] = cordinates
    temp["productId"] = newOrderDetail

    let url = "admin/editMaterialOrder"
    this.commonService.showSpinner()
    this.apiService.putApi(url,temp,1).subscribe((res)=>{
      if (res.responseCode == 200) {
        this.editOrder = true
        $('#editModal').modal('hide')
        this.orderDetail["area"] = area
        this.orderDetail["location"] = {coordinates : [this.latitude,this.longitude],type : "Point"}
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
    

  }

  navigateView(id){
    this.router.navigate([`/delivery/view-agent/${id}`])
  }
  tempMaterialList : any = []
  searchItemMaterail(event){
    console.log(this.materialList);
    
    this.materialList = this.tempMaterialList.filter((res)=>{
      let itemName = String(res.item).toLocaleLowerCase()
      let color = String(res.color).toLocaleLowerCase()
      let brand  = String(res.brand).toLocaleLowerCase()
      let size = String(res.size).toLocaleLowerCase()
      
      return itemName.includes(String(event.target.value).toLocaleLowerCase()) || color.includes(String(event.target.value).toLocaleLowerCase()) || brand.includes(String(event.target.value).toLocaleLowerCase()) || size.includes(String(event.target.value).toLocaleLowerCase())
    })
    console.log(this.materialList);
    
  }

  // -=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-
  categoryList : any = []
  categoryName = 0 
  getCategoryList(){
    let apiReqUrl = "category/categorylistwithoutPagination"
    let apiReqData = {
      
    }
    this.commonService.showSpinner()
    this.apiService.postApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.categoryList = res.result.filter((val)=>{
          return val.categoryType == "MATERIAL"
        })
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
  itemList : any = []
  itemName = 0
  getItem(e){
    
    this.itemList = this.tempMaterialList.filter((val)=>{
      return val.categoryId._id == e.target.value
    })
  }
  brandList : any =[]
  brandName = 0
  brand(e){
    
    this.brandList = this.itemList.filter((val)=>{
      return val.item == e.target.value
    })
  }
  colorList : any = []
  colorName = 0
  colur(e){
    this.colorList = this.brandList.filter((val)=>{
      return val.brand == e.target.value
    })
  }
  sizeList : any = []
  sizeName = 0
  size(e){
    this.sizeList = this.colorList.filter((val)=>{
      return val.color == e.target.value
    })
  }
  finalList : any = []
  getproduct(e){
    this.finalList = this.colorList.filter((val)=>{
      return val.size == e.target.value
    })
    console.log(this.finalList);
    
  }
  isAssending : boolean =  true
  sortName(arr,key){
    
  }
  sortAgent(key){
    if(this.isAssending){
     this.listArray =  this.listArray.sort((a,b)=>{
      return a[key] > b[key] ? 1 : -1
      })
    }
    else{
      this.listArray =  this.listArray.sort((a,b)=>{
        return a[key] < b[key] ? 1 : -1
        })
    }
  }
  sortexpert(key){
    if(this.isAssending){
     this.orderDetail =  this.orderDetail.sort((a,b)=>{
      return a[key] > b[key] ? 1 : -1
      })
    }
    else{
      this.orderDetail =  this.orderDetail.sort((a,b)=>{
        return a[key] < b[key] ? 1 : -1
        })
    }
  }
  
  sortAgentVehicle(){
    if(this.isAssending){
     this.listArray =  this.listArray.sort((a,b)=>{
      return a.vehicleType[0]?.vehicleType > b.vehicleType[0]?.vehicleType ? 1 : -1
      })
    }
    else{
      this.listArray =  this.listArray.sort((a,b)=>{
        return a.vehicleType[0]?.vehicleType < b.vehicleType[0]?.vehicleType ? 1 : -1
        })
    }
  }
  sortExpertVehicle(){
    if(this.isAssending){
     this.orderDetail =  this.orderDetail.sort((a,b)=>{
      return a.vehicleType[0]?.vehicleType > b.vehicleType[0]?.vehicleType ? 1 : -1
      })
    }
    else{
      this.orderDetail =  this.orderDetail.sort((a,b)=>{
        return a.vehicleType[0]?.vehicleType < b.vehicleType[0]?.vehicleType ? 1 : -1
        })
    }
  }
  countArray(n : number){
    return new Array(n);
  }
  
}
