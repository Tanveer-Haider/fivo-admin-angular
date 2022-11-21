import { Component, OnInit } from "@angular/core";
import { ApiFunctionalityService } from "src/app/Services/api-functionality.service";
import { CommonService } from "src/app/Services/common.service";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

declare var $;
@Component({
  selector: "app-job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ["./job-list.component.css"],
})
export class JobListComponent implements OnInit {
  customerDataExcel: any = [];

  pageSize: any = 10;
  total;
  currentPage = 1;
  listArray: any = [];
  hirerList: any;
  product: any = [];
  adminList: any = [];
  constructor(
    public commonService: CommonService,
    public service: ApiFunctionalityService,
    private datepipe: DatePipe
  ) {
    console.log("order list component");
  }
  changePage(e) {
    this.currentPage = e;
    this.getAllAdminList()
  }
  ngOnInit(): void {
    this.getAllAdminList();
    this.orderDashboard();
  }
  openCancelModal(id) {
    this.orderId = id;
    $("#cancelModal").modal({
      show: true,
      backdrop: false,
    });
  }

  status: any = "ALL";
  filterStatus(e) {
    this.status = e;
    this.currentPage = 1;
    console.log(e);

    this.getAllAdminList();
  }
  // get order list
  getAllAdminList() {
    let url = `admin/orderServiceList?page=${this.currentPage}&limit=${this.pageSize
      }${this.status != "ALL" ? "&orderStatus1=" + this.status : ""}`;
    this.commonService.showSpinner();
    this.service.getApi(url, 1).subscribe(
      (res) => {
        if (res.responseCode == 200) {
          this.adminList = res.result.docs;
          this.total = res.result.total;
          // this.product = this.adminList.productId
          // this.commonService.successToast(res.responseMessage)
          this.commonService.hideSpinner();
        } else {
          this.commonService.errorToast(res.responseMessage);
          this.commonService.hideSpinner();
        }
      },
      (err) => {
        this.adminList = [];
      }
    );
  }

  // updateStatus(id,status){
  //       let url = "admin/updateOrderStatus?_id="+id
  //       // const data = {
  //       //   updateStatus : status
  //       // }
  //       var data  = new FormData()
  //       data.append('updateStatus',status)
  //      this.commonService.showSpinner()
  //   this.service.putFormDataApi(url,data,1).subscribe((res)=>{
  //     if(res.responseCode == 200){
  //       this.getAllAdminList()
  //       this.commonService.successToast(res.responseMessage)
  //       this.commonService.hideSpinner()
  //     }else{
  //       this.commonService.errorToast(res.responseMessage)
  //       this.commonService.hideSpinner()
  //     }
  //   })
  // }
  orderId: any;
  // openCancelModal(id){
  //   this.orderId= id
  // }
  // cancel order list
  deleteOrder() {
    // let url = "admin/deleteManyJob"
    let url = "admin/deleteManyOrderMaterial";
    let data = {
      metarialId: this.deleteAdvertId,
    };
    this.commonService.showSpinner();
    this.service.deleteApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        $("#cancelModal").modal({
          show: true,
          backdrop: false,
        });
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false;
        }
        this.deleteAdvertId = [];
        this.getAllAdminList();
        this.orderDashboard();
        this.commonService.successToast(res.responseMessage);
        this.commonService.hideSpinner();
      } else {
        this.commonService.errorToast(res.responseMessage);
        this.commonService.hideSpinner();
      }
    });
  }
  //------------------ export as excel for download file --------------//
  exportAsXLSX() {
    // let apiReqUrl = `admin/orderList?page=${this.currentPage}&limit=${this.total}`;
    let apiReqUrl = `admin/orderList?page=${this.currentPage}${this.total ? "&limit=" + this.total : ""}`;
    this.service.getApi(apiReqUrl, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "Order Id": element.orderId ? element.orderId : "--",
            "Order Date": element.createdAt
              ? this.datepipe.transform(element.createdAt, "medium")
              : "--",
            Client:
              element.clientId?.firstName + " " + element.clientId?.surName
                ? element.clientId?.firstName + " " + element.clientId?.surName
                : "--",
            Expert:
              element.agent_Expert_Id?.firstName +
                " " +
                element.agent_Expert_Id?.surName
                ? element.agent_Expert_Id?.firstName +
                " " +
                element.agent_Expert_Id?.surName
                : "--",
            Description: element.serviceId[0]?.description
              ? element.serviceId[0]?.description
              : "--",
            Total: element.total ? element.total : "--",
            Status: element.orderStatus ? element.orderStatus : "--",
          };
          let array = dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Jobs Management");
      }
    });
  }
  // changeStat(){
  //  this.isSearched = false
  // }
  // get order list
  dashboard: any;
  orderDashboard() {
    let url = "admin/orderServiceDashboard";
    this.commonService.showSpinner();
    this.service.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.dashboard = res.result;
        // this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner();
      } else {
        this.commonService.errorToast(res.responseMessage);
        this.commonService.hideSpinner();
      }
    });
  }

  addRow(e) {
    this.pageSize = e.target.value;
    this.currentPage = 1;
    this.getAllAdminList();
  }
  //  open modal to delete admin for particular delete
  deleteAdvertId: any = [];
  openDeleteModal(id) {
    this.deleteAdvertId = [];
    this.deleteAdvertId[0] = id;
    $("#deleteModal").modal({
      show: true,
      backdrop: false,
    });
  }
  // delete for bulk delete
  action: any = 0;
  openBulkDeleteModal() {
    if (this.deleteAdvertId != "") {
      if (!this.action || this.action == 0) {
        return;
      }
      $("#deletebulkModal").modal({
        show: true,
        backdrop: false,
      });
    } else {
      this.commonService.infoToast("Please select service to delete.");
    }
  }
  // editAdmin(id){
  //   this.router.navigate(["/admin/edit-admin"],{queryParams : {id}})
  // }

  // add id which is to be delete
  addAdminId(id, e) {
    console.log(id, e.target.checked);
    if (e.target.checked) {
      this.deleteAdvertId.push(id);
    } else {
      this.deleteAdvertId.splice(this.deleteAdvertId.indexOf(id), 1);
    }
    console.log(this.deleteAdvertId);
  }
  checkbox: any = [];
  // add all id by single click
  addMultipleId(e) {
    this.deleteAdvertId = [];
    if (e.target.checked) {
      let i = 0;
      for (let item of this.adminList) {
        this.checkbox[i] = true;
        i++;
        this.deleteAdvertId.push(item?._id);
      }
    } else {
      let i = 0;
      for (let item of this.adminList) {
        this.checkbox[i] = false;
        i++;
        this.deleteAdvertId.push(item?._id);
      }

      this.deleteAdvertId = [];
    }
  }

  assending: boolean = true;
  sorting() {
    if (this.assending) {
      this.adminList = this.adminList.sort((a, b) => {
        let a1 = Date.parse(a.createdAt);
        let a2 = Date.parse(b.createdAt);
        return a1 - a2;
      });
      this.assending = false;
    } else {
      this.adminList = this.adminList.sort((a, b) => {
        let a1 = Date.parse(a.createdAt);
        let a2 = Date.parse(b.createdAt);
        return a2 - a1;
      });
      this.assending = true;
    }

    console.log(this.adminList);
  }
}
