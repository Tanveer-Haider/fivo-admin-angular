import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

declare var $;
@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  pageSize: any = 10
  total: any
  action: any = 0
  currentPage = 1
  deletePoductId: any = []
  listArray: any = []
  timer: any
  selectAll: any
  search: any
  customerDataExcel: any = []
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 2;

  ServicePoviderHeader: any = [
    { "id": 1, "name": "All Reviews", "backgroundColor": "bg-green", "icon": "fa fa-star" },
  ]
  constructor(private apiService: ApiFunctionalityService, public commonService: CommonService, private router: Router, private datepipe: DatePipe) {
    console.log("serviceProvider list component");
    // this.listArray=dummy
    console.log(this.listArray)
  }
  //  changePage(e){

  //  }
  ngOnInit(): void {
    this.ratingDashboard()
    this.listReview()
  }
  //  Rating dashboard
  dashboard: any
  ratingDashboard() {
    let url = "admin/ratingDashbord"
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
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

  listReview() {
    let apiReqUrl = "admin/listRating"
    var apiReqData = new FormData();
    apiReqData.append('page', String(this.currentPage))
    apiReqData.append('limit', String(this.pageSize))
    if (this.search) {
      apiReqData.append('search', String(this.search))
    }

    this.commonService.showSpinner()
    this.apiService.postFormDataApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.listArray = res.result.docs
        this.total = res.result.total
        this.commonService.hideSpinner()
        //  this.commonService.successToast(res.responseMessage)
      }
      else {
        this.listArray = []
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, err => {
      this.listArray = []
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.error.responseMessage)
    })
  }

  exportAsXLSX() {

    let apiReqUrl = `admin/listRating`
    var apiReqData = {
      'limit': this.total ? String(this.total) : ""
    };
    this.apiService.postFormDataApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "Rating": element.rating ? element.rating : "--",
            "Reviewed by": element.clientId?.email ? element.clientId?.email : "--",
            "Review": element.review ? element.review : "--",
            "Date": element.updatedAt ? this.datepipe.transform(element.updatedAt, "medium") : "--",
            "Job ID": element.productId ? element.productId : "--",
          };
          let array = dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Review Management");
      }
    })
  }
  //  viewReview(id){
  //     this.router.navigate([`/reviews/view-review/:id`],{queryParams : {id : id}})
  //  }
  viewReview(orderType, id) {
    if (orderType == 'PRODUCT') {
      this.router.navigate([`/materials/view-material-order`], { queryParams: { id: id } })
    } else {
      this.router.navigate([`/jobs/view-job`], { queryParams: { id: id } })
    }
  }

  openDeleteModal(id) {
    this.deletePoductId = []
    this.deletePoductId[0] = id
    $('#deleteModal').modal({
      show: true,
      backdrop: false
    })
  }

  openBulkDeleteModal() {
    if (this.deletePoductId != '') {
      if (!this.action || this.action == 0) {
        return
      }
      $('#deletebulkModal').modal({
        show: true,
        backdrop: false
      })
    }
    else {
      this.commonService.infoToast("Please select review to delete.")
    }
  }
  closeDeleteModal() {
    $('#deleteModal').modal('hide')
  }
  searchText(e) {
    console.log(e.target.value);


    // if (!e.target.value) {
    //   return
    // }
    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 1
      me.listReview();
    }, 2000);
  }


  changePage(e) {
    this.currentPage = e
    this.selectAll = false
    let i = 0
    for (let item of this.listArray) {
      this.checkbox[i] = false
      i++

      this.deletePoductId = []
    }
    this.listReview()
  }

  addAdminId(id, e) {
    console.log(id, e.target.checked);
    if (e.target.checked) {
      this.deletePoductId.push(id);
    } else {
      this.deletePoductId.splice(this.deletePoductId.indexOf(id), 1);
    }
    console.log(this.deletePoductId);
  }
  checkbox: any = []
  addMultipleId(e) {
    this.deletePoductId = []
    if (e.target.checked) {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = true
        i++
        this.deletePoductId.push(item?._id)
      }
    }
    else {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = false
        i++
        this.deletePoductId.push(item?._id)
      }

      this.deletePoductId = []
    }
    console.log(this.deletePoductId);

  }

  addRow(e) {

    this.pageSize = e.target.value
    this.currentPage = 1
    this.listReview()

  }



  // delete product
  deleteProduct() {
    let url = `admin/deleteAllReview`
    let data = {
      "reviewId": this.deletePoductId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url, data, 1).subscribe(res => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.listReview()
        this.deletePoductId = []
        this.closeDeleteModal()
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

}