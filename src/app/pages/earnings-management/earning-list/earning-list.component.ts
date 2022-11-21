import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-earning-list',
  templateUrl: './earning-list.component.html',
  styleUrls: ['./earning-list.component.css']
})
export class EarningListComponent implements OnInit {

  pageSize: any = 10
  total = 10
  currentPage = 1
  search: any
  customerDataExcel: any = []
  listArray: any = []
  useCurrency: any = localStorage.getItem("useCurrency") ? localStorage.getItem("useCurrency") : 'K'
  constructor(private activatedRouting: ActivatedRoute, public commonService: CommonService, public service: ApiFunctionalityService, private router: Router, private datepipe: DatePipe) {

  }

  ngOnInit(): void {
    this.getEarningList()
  }

  getEarningList() {
    let url = `admin/listTransactionWithFilter`
    const data = {
      page: String(this.currentPage),
      limit: String(this.pageSize),
      search: this.search

    }
    this.service.postApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {

        this.listArray = res.result.docs
        this.total = res.result.total
      } else {

        this.listArray = []
        this.total = 0
      }
    }, (err) => {
      this.listArray = []
      this.total = 0
    })
  }
  timer: any
  searchText(e) {
    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 1
      me.getEarningList();
    }, 2000);
  }
  parseInt(e: any) {
    return Number(e)
  }
  changePaymentStatus(id, status) {
    let url = `admin/updateStatusOfTransaction?_id=${id}`
    const data = {
      paymentStatus: status

    }
    this.service.putApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.getEarningList()
        this.commonService.successToast(res.responseMessage)
      } else {

      }
    })
  }
  changeSettelmentStatus(id, status) {
    let url = `admin/updateStatusOfTransaction?_id=${id}`
    const data = {
      settlementStatus: status

    }
    this.service.putApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.getEarningList()
        this.commonService.successToast(res.responseMessage)
      } else {

      }
    })
  }
  navigateToOrder(orderType: any, _id: any) {
    if (orderType == 'PRODUCT') {
      this.router.navigate(['/materials/view-material-order'], { queryParams: { id: _id } })
    }
    if (orderType == 'SERVICE') {
      this.router.navigate(['/jobs/view-job'], { queryParams: { id: _id } })
    }

  }
  exportAsXLSX() {

    let apiReqUrl = `admin/listTransactionWithFilter`
    let apiReqData = {
      page: String(this.currentPage),
      limit: String(this.total),
    }
    this.service.postApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          let adminEarning
          if (element.transactionType == 'PRODUCT') {
            if (element?.cancelReasonDetails) {
              adminEarning = Number(element?.serviceAreaDetails.indexes) * Number(element?.cancelReasonDetails?.cancellationFee)
            }
            else {
              adminEarning = Number(element?.orderDetails?.total) - Number(element?.orderDetails?.deliveryFee)
            }
          }
          else {
            if (element?.cancelReasonDetails) {
              adminEarning = Number(element?.serviceAreaDetails.indexes) * Number(element?.cancelReasonDetails?.cancellationFee)
            }
            else {
              adminEarning = Number(element?.orderDetails?.total) - Number(element?.orderDetails?.expertFee)
            }
          }
          obj = {
            "Order ID": element.orderDetails?.orderId ? element.orderDetails?.orderId : "--",
            "Order Date": element.orderDetails?.createdAt ? this.datepipe.transform(element.orderDetails?.createdAt, "medium") : "--",
            "Expert Fee": element.orderDetails?.expertFee ? element.orderDetails?.expertFee : "--",
            "Total": element.orderDetails?.total ? element.orderDetails?.total : "--",
            "Delivery Fee": element.orderDetails?.deliveryFee ? element.orderDetails?.deliveryFee : "--",
            "Material Amount": element.orderDetails?.orginalTotalPrice ? element.orderDetails?.orginalTotalPrice : "--",
            "Cancellation Fee": element.cancelReasonDetails?.cancellationFee ? element.cancelReasonDetails?.cancellationFee : "--",
            "Admin Earning": adminEarning ? adminEarning : "--",
            "Payment Status": element.paymentStatus ? element.paymentStatus : "--",
            "Settlement Status": element.settlementStatus ? element.settlementStatus : "--"
          };
          dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Earning Management");
      }
    })
  }
  changePage(e) {
    this.currentPage = e
    this.getEarningList()
  }
  addRow(e) {

    this.pageSize = e.target.value
    this.currentPage = 1
    this.getEarningList()

  }

  calculateAdminEarning(orderAmount, expertCommision) {
    let totalEarning = 0
    let commision = (expertCommision / 100) * orderAmount

    totalEarning = (orderAmount - commision)



    return totalEarning

  }

}
