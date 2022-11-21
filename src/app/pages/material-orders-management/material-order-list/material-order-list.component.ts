import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
import { Options } from '@angular-slider/ngx-slider';
import { ifError } from 'assert';

declare var $;
@Component({
  selector: 'app-material-order-list',
  templateUrl: './material-order-list.component.html',
  styleUrls: ['./material-order-list.component.css']
})
export class MaterialOrderListComponent implements OnInit {
  pageSize: any = 5
  total: any
  currentPage = 1
  listArray: any = []
  customerDataExcel: any = []
  search: any
  selectAll: any
  orderId: any
  amount: any
  value: number = 0;
  highValue: number = 1750;
  options: Options = {
    floor: 0,
    ceil: 2581,
    showTicks: true
  };

  constructor(private activatedRouting: ActivatedRoute, public commonService: CommonService, public service: ApiFunctionalityService, private router: Router, private datepipe: DatePipe) {
    console.log("order list component");

  }
  changePage(e) {
    this.currentPage = e
    this.selectAll = false
    let i = 0
    for (let item of this.listArray) {
      this.checkbox[i] = false
      i++

      this.deleteAdminId = []
    }
    this.getMaterailList()
  }
  ngOnInit(): void {
    this.getMaterailList()
    // this.filterList()
    this.orderDashboard()
    // this.agentList()
  }

  status: any = "ALL"
  filterStatus(e) {
    this.status = e
    this.currentPage = 1
    console.log(e);
    // this.filterList()
    this.getMaterailList()
  }

  tempArray: any = []
  getMaterailList() {
    let url
    // if(){
    //   url  = `admin/listOrderMaterial?page=${this.currentPage}&limit=${this.pageSize}`
    // }
    // else{
    // url = `admin/orderProductList?page=${this.currentPage}&limit=${this.pageSize}${this.search ? "&search=" + this.search : ''}${this.status == 'ALL' ? '' : '&orderStatus='+this.status}`
    // }
    let data = {

    }
    url = "admin/orderProductListWithoutPagination"
    this.commonService.showSpinner()
    this.service.getApi(url, 1).subscribe((res) => {
      if (res['responseCode'] == 200) {
        this.listArray = res['result']["dataResults"]
        this.tempArray = res['result']["dataResults"]
        res['result']["dataResults"].forEach(element => {
          if (element?.agent_Expert_Id) {
            this.agentLists.push(element.agent_Expert_Id)
          }
        });
        this.total = this.listArray.length

        this.options.ceil = Number(res.result.maxAmount)
        this.commonService.hideSpinner()
        // this.commonService.successToast(res["responseMessage"])
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res["responseMessage"])
      }
    }, (err) => {
      this.listArray = []
    })
  }



  //  open modal to delete admin for particular delete
  deleteAdminId: any = []
  openDeleteModal(id) {
    this.deleteAdminId = []
    this.deleteAdminId[0] = id
    $('#deleteModal').modal({
      show: true,
      backdrop: false
    })
  }
  // delete for bulk delete
  action: any = 0
  openBulkDeleteModal() {
    if (this.deleteAdminId != '') {
      if (!this.action || this.action == 0) {
        return
      }
      $('#deletebulkModal').modal({
        show: true,
        backdrop: false
      })
    }
    else {
      this.commonService.infoToast("Please select material to delete.")
    }
  }
  // viewAdmin(id){
  //   this.router.navigate(["/admin/view-admin"],{queryParams : {id}})
  // }
  // editAdmin(id){
  //   this.router.navigate(["/admin/edit-admin"],{queryParams : {id}})
  // }
  // blockUnblockUser(id){
  //   let url = "admin/userActiveBlock?_id="+id
  //   this.commonService.showSpinner()
  //   this.service.putApi(url,{},1).subscribe((res)=>{
  //     if(res.responseCode == 200){
  //       $('#deleteModal').modal({
  //         show : false,
  //         backdrop : false
  //       })
  //       this.getMaterailList()
  //       this.commonService.successToast(res.responseMessage)
  //       this.commonService.hideSpinner()
  //     }else{
  //       this.commonService.errorToast(res.responseMessage)
  //       this.commonService.hideSpinner()
  //     }
  //   })
  // }
  deleteAdmin() {
    // let url = "admin/deleteUser"
    let url = "admin/deleteManyOrderMaterial"

    const data = {
      metarialId: this.deleteAdminId
    }
    this.commonService.showSpinner()
    this.service.deleteApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.getMaterailList()
        this.deleteAdminId = []
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }
  // add id which is to be delete
  addAdminId(id, e) {
    console.log(id, e.target.checked);
    if (e.target.checked) {
      this.deleteAdminId.push(id);
    } else {
      this.deleteAdminId.splice(this.deleteAdminId.indexOf(id), 1);
    }
    console.log(this.deleteAdminId);
  }
  checkbox: any = []
  // add all id by single click
  addMultipleId(e) {
    this.deleteAdminId = []
    if (e.target.checked) {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = true
        i++
        this.deleteAdminId.push(item?._id)
      }
    }
    else {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = false
        i++
        this.deleteAdminId.push(item?._id)
      }

      this.deleteAdminId = []
    }
    console.log(this.deleteAdminId);

  }
  fromDate: any
  toDate: any
  agentId: any
  minAmount: any
  maxAmount: any

  filterList() {
    // this.getMaterailList()

    let url = "admin/listOrderMaterial"


    let data = {
      fromDate: Date.parse(this.fromDate),
      toDate: Date.parse(this.toDate),
      // page: this.currentPage,
      // limit: this.pageSize,
      // search: this.search,
      minAmount: Number(this.value),
      maxAmount: Number(this.highValue)
    }
    console.log(data);

    let arr = []
    if (data.fromDate) {
      arr = this.tempArray.filter((res) => {
        let fDate = Date.parse(res.createdAt)
        let tDate = Date.parse(res.createdAt)

        return data.fromDate <= fDate
      })
    }
    if (data.toDate) {
      arr = this.tempArray.filter((res) => {
        let fDate = Date.parse(res.createdAt)
        let tDate = Date.parse(res.createdAt)

        return data.toDate >= fDate
      })
    }
    console.log(arr);
    if (data.minAmount || data.minAmount == 0) {
      arr = this.tempArray.filter((res) => {

        console.log(data.minAmount, res.total);

        return data.minAmount <= res.total
      })
    }
    console.log(arr);

    if (data.maxAmount) {
      arr = arr.filter((res) => {

        console.log(data.maxAmount, res.total);
        return data.maxAmount >= res.total
      })
    }

    if (this.deliveryAgentId) {
      arr = this.tempArray.filter((res) => {


        return this.deliveryAgentId == res?.agent_Expert_Id?._id
      })
    }

    this.listArray = arr
    console.log(this.listArray);

    // this.commonService.showSpinner()
    // this.service.postApi(url, data, 1).subscribe((res) => {
    //   if (res['responseCode'] == 200) {
    //     this.listArray = res['result']["list"]["docs"]
    //     this.total = res.result.list.total
    //     this.highValue  =res.result.maxAmount
    //     this.commonService.hideSpinner()
    //     // this.commonService.successToast(res["responseMessage"])
    //   }
    //   else {
    //     this.commonService.hideSpinner()
    //     this.commonService.errorToast(res["responseMessage"])
    //   }
    // })

  }

  openFilterModal() {
    $('#filterModal').modal('show')
  }

  addRow(e) {

    this.pageSize = e.target.value
    this.currentPage = 1
    this.getMaterailList()

  }
  timer: any
  searchText(e) {
    console.log(e.target.value);
    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 1
      me.filterBySearchText(String(e.target.value).toLocaleLowerCase());
    }, 2000);
  }

  filterBySearchText(e) {
    let arr = []
    arr = this.tempArray.filter((res) => {
      let orderId = String(res.orderId).toLocaleLowerCase()
      let clientFName = String(res.clientId.firstName).toLocaleLowerCase()
      let clientLName = String(res.clientId.surName).toLocaleLowerCase()

      let agent = String(res?.agentId?.companyName || res?.agent_Expert_Id?.firstName + res?.agent_Expert_Id?.surName).toLocaleLowerCase()
      return orderId.includes(e) || (clientFName + clientLName).includes(e) || agent.includes(e)
    })
    this.listArray = arr
    console.log(this.listArray);

  }
  //------------------ export as excel for download file --------------//
  exportAsXLSX() {

    // let apiReqUrl = `admin/listOrderMaterial?page=${this.currentPage}&limit=${this.pageSize}${this.search ? "&search=" + this.search : ''}`
    let apiReqUrl = `admin/listOrderMaterial?page=${this.currentPage}${this.total ? "&limit=" + this.total : ""}${this.search ? "&search=" + this.search : ''}`
    let apiReqData = {}
    this.service.postApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "Order Id": element.orderId ? element.orderId : "--",
            "Order Date": element.createdAt ? this.datepipe.transform(element.createdAt, "medium") : "--",
            "Client": element.clientId?.firstName + '' + element.clientId?.surName ? element.clientId?.firstName + '' + element.clientId?.surName : "--",
            "Delivery Agent": element.agent_Expert_Id?.firstName + '' + element.agent_Expert_Id?.surName ? element.agent_Expert_Id?.firstName + '' + element.agent_Expert_Id?.surName : "--",
            "Total": element.total ? element.total : "--",
            "Status": element.orderStatus ? element.orderStatus : "--",
          };
          let array = dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Material Management");
      }
    })
  }

  // get order list 
  dashboard: any
  orderDashboard() {
    let url = "admin/orderProductDashboard"
    this.commonService.showSpinner()
    this.service.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.dashboard = res.result
        // this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })

  }

  assending: boolean = true
  sorting() {
    if (this.assending) {
      this.listArray = this.listArray.sort((a, b) => {
        return a.total - b.total

      })
      this.assending = false

    }
    else {
      this.listArray = this.listArray.sort((a, b) => {
        return b.total - a.total

      })
      this.assending = true
    }

    console.log(this.listArray);

  }
  agentLists: any = [];
  // list agent
  agentList() {

    let url = `admin/listUser?userType1=AGENT`
    this.commonService.showSpinner()
    this.service.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.agentLists = res.result.docs
        // this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })

  }
  deliveryAgentId
  getAgentId(e) {
    this.deliveryAgentId = e.target.value
  }
}
