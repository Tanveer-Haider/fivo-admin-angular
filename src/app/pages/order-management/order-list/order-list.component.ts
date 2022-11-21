import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $: any
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  pageSize: any = 5
  total: any
  currentPage = 1
  customerDataExcel: any = [];
  listArray: any = []
  hirerList: any;
  product: any = []
  adminList: any = []
  useCurrency: any = localStorage.getItem("useCurrency")

  status: any = "ALL"
  constructor(public commonService: CommonService, public service: ApiFunctionalityService, private datepipe: DatePipe) {
    console.log("order list component");

  }
  changePage(e) {
    this.currentPage = e
    this.getAllAdminList()

  }
  ngOnInit(): void {
    this.getAllAdminList()
    this.orderDashboard()
  }
  filterStatus(e) {
    this.status = e
    this.currentPage = 1
    console.log(e);

    this.getAllAdminList()
  }
  openCancelModal(id) {
    this.orderId = id
    $('#cancelModal').modal({
      show: true,
      backdrop: false
    })
  }
  // get order list 
  getAllAdminList() {
    let url = `admin/orderList?page=${this.currentPage}&limit=${this.pageSize}${this.status != 'ALL' ? '&orderStatus1=' + this.status : ''}`
    this.commonService.showSpinner()
    this.service.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.adminList = res.result.docs
        this.total = res.result.total
        // this.product = this.adminList.productId
        // this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.adminList = []
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    }, (err) => {
      // this.commonService.errorToast(err.responseMessage)
      this.adminList = []
    })

  }
  obj: any = {}
  statusOrder = ''
  openStatusOrderModal(obj, status) {
    this.obj = obj
    this.statusOrder = status
    $('#updateorderModal').modal({
      show: true,
      backdrop: false
    })
  }

  updateStatus() {
    if (this.obj.orderStatus == "PENDING") {
      if (this.statusOrder != "UNDER_REVIEW") {
        this.commonService.warningToast(`Can not update the order status to ${String(this.statusOrder).replace("_", " ").toLowerCase()} if order is not reviewed`)
        return
      }
    }
    else if (this.obj.orderStatus == "UNDER_REVIEW") {
      if (this.statusOrder == "STARTED_OFF") {
        if (!this.obj.agent_Expert_Id) {
          this.commonService.warningToast(`Can not update the order status to ${String(this.statusOrder).replace("_", " ").toLowerCase()} if order is not assigned`)
          return
        }

      }
      if (this.statusOrder == "DISPATCHED") {
        this.commonService.warningToast(`Can not update the order status to ${String(this.statusOrder).replace("_", " ").toLowerCase()} if order is not assigned`)
        return
      }
      if (this.statusOrder == "DELIVERED") {
        this.commonService.warningToast(`Can not update the order status to ${String(this.statusOrder).replace("_", " ").toLowerCase()} if order is not assigned`)
        return
      }
      if (this.statusOrder == "UNDER_REVIEW") {
        this.commonService.warningToast(`This order is already under review`)
        return
      }
      if (this.statusOrder == "COMPLETED") {
        this.commonService.warningToast(`This order is not started`)
        return
      }
    }
    else if (this.obj.orderStatus == "STARTED_OFF") {

      if (this.statusOrder == "UNDER_REVIEW") {
        this.commonService.warningToast(`This order is already reviewed`)
        return
      }
      else if (this.statusOrder == "STARTED_OFF") {
        this.commonService.warningToast(`This order is already started`)
        return
      }
      else if (this.statusOrder == "DISPATCHED") {
        if (!this.obj.agent_Expert_Id) {
          this.commonService.warningToast(`Please assign this order to Agent`)
          return
        }
      }
      else if (this.statusOrder == "COMPLETED") {
        if (!this.obj.agent_Expert_Id) {
          this.commonService.warningToast(`This service is not assigned to any expert by the user`)
          return
        }
      }
      else {
        this.commonService.warningToast(`This order is not dispatched`)
        return
      }
    }
    else if (this.obj.orderStatus == "ASSIGNED") {
      if (this.statusOrder == "UNDER_REVIEW") {
        this.commonService.warningToast(`This order is already reviewed`)
        return
      }
      if (this.statusOrder == "COMPLETED") {
        // this.commonService.warningToast(`This order is not started`)
        this.commonService.warningToast(`Update to started off`)


        return
      }
      else if (this.statusOrder == "STARTED_OFF") {
        // if(this.obj.orderType != 'SERVICE'){
        //   this.commonService.warningToast(`This order is already started`)
        //   return
        // }

      }
      // else if(this.statusOrder == "DELIVERED" || this.statusOrder == "COMPLETED"){
      //   this.commonService.warningToast(`This order is not dispatched`)
      //   return
      // }

    }
    else if (this.obj.orderStatus == "DISPATCHED") {
      if (this.statusOrder == "UNDER_REVIEW") {
        this.commonService.warningToast(`This order is already reviewed`)
        return
      }
      else if (this.statusOrder == "STARTED_OFF") {
        this.commonService.warningToast(`This order is already started`)
        return
      }
      else if (this.statusOrder == "DISPATCHED") {
        this.commonService.warningToast(`This order is already dispatched`)
        return
      }

    }
    else {
      this.commonService.warningToast(`This order is already ${String(this.obj.orderStatus).toLowerCase()}`)
      return
    }
    let url = "admin/updateOrderStatus?_id=" + this.obj._id
    const data = {
      updateStatus: this.statusOrder
    }
    // var data  = new FormData()
    // data.append('updateStatus',status)
    this.commonService.showSpinner()
    this.service.putFormDataApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.getAllAdminList()
        this.orderDashboard()
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }
  orderId: any
  // openCancelModal(id){
  //   this.orderId= id
  // }
  // cancel order list
  cancelOrder() {

    let url = "admin/cancelOrder?_id=" + this.orderId

    this.commonService.showSpinner()
    this.service.putApi(url, {}, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        $('#cancelModal').modal('hide')
        this.getAllAdminList()
        this.orderDashboard()
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }
  //------------------ export as excel for download file --------------//
  exportAsXLSX() {
    // let apiReqBody = {
    //   search: this.searchForm.value.search,
    //   fromDate: this.searchForm.value.fromDate,
    //   toDate:this.searchForm.value.toDate,
    //   limit:this.totalItems
    // };
    // let apiReqUrl = `admin/orderList?page=${this.currentPage}&limit=${this.total}`
    let apiReqUrl = `admin/orderList?page=${this.currentPage}${this.total ? "&limit=" + this.total : ""}`
    this.service.getApi(apiReqUrl, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "Order Id": element.orderId ? element.orderId : "--",
            // "Client": element.clientId?.firstName ? element.clientId?.firstName : '-'+' '+element.clientId?.surName ? element.clientId?.surName : "--",
            "Client": element.clientId?.firstName ? ((element.clientId.firstName ? element.clientId.firstName : ' ') + ' ' + (element.clientId.surName ? element.clientId.surName : ' ')) : '--',
            // "Agent/Expert": element.agent_Expert_Id?.firstName ? element.agent_Expert_Id?.firstName : "-"+' '+element.agent_Expert_Id?.surName ? element.agent_Expert_Id?.surName : "-",
            "Agent/Expert": element.agent_Expert_Id?.firstName ? ((element.agent_Expert_Id.firstName ? element.agent_Expert_Id.firstName : ' ') + ' ' + (element.agent_Expert_Id.surName ? element.agent_Expert_Id.surName : ' ')) : '--',

            "Area": element.area ? element.area : "--",
            "Google Location": element.location.coordinates ? `https://www.google.com/maps/@${element?.location?.coordinates[0]},${element?.location?.coordinates[1]},5z` : "--",
            "Total": element.total ? element.total : "--",
            "Status": element.orderStatus ? element.orderStatus : "--",
            // "Update Status": element.updateOrderStatus ? element.updateOrderStatus : "--",
            "Order Date": element.createdAt ? this.datepipe.transform(element.createdAt, "medium") : "--",
          };
          let array = dataArr.push(obj);
        });
        console.log(dataArr);
        console.log(this.obj);


        this.commonService.exportAsExcelFile(dataArr, "Order Management");
      }
    })
  }
  // get order list 
  dashboard: any
  orderDashboard() {
    let url = "admin/orderDashboard"
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
  addRow(e) {
    this.pageSize = e.target.value
    this.currentPage = 1
    this.getAllAdminList()
  }
}
