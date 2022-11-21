import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $: any;

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clientListForm
  customerDataExcel: any = [];
  pageSize: any = 5;
  checked: any = [];
  deleteAdminId: any = [];
  selectAll: any;
  checkbox: any = [];
  total: any;
  search: any;
  currentPage = 1;
  action: any = 0;
  listArray: any = [];

  constructor(private apiService: ApiFunctionalityService, public commonService: CommonService, private datepipe: DatePipe, private router: Router, private formbuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.clientList()
    this.clientDashboard()
  }
  status : any = "ALL"
  filterStatus(e){
    this.status = e
    this.currentPage = 1
    console.log(e);
    
    this.clientList()
  }

  /* -=-=-=-=-=-=- Api of client List -=-=-=-=-=-==-=-= */
  clientList() {
    let apiReqUrl = `admin/listClient`
    var apiReqData = {
      'page': String(this.currentPage),
      'limit' : this.pageSize,
      'search': this.search,
      'status1' : this.status != "ALL" ? this.status : ''  
    }
    var temp = this.commonService.removeEmptyKey(apiReqData)
    //  apiReqData.append('page',String(this.currentPage))
    //  apiReqData.append('search',this.search)
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
    }, (err) => {
      if (err) {
        this.listArray = []
      }
    })
  }

  openDeleteModal(id) {
    this.deleteAdminId = []
    this.deleteAdminId[0] = id
    $('#deleteModal').modal({
      show: true,
      backdrop: false
    })
  }
  openBulkDeleteModal() {
    if (this.deleteAdminId != '') {
      if (!this.action || this.action == 0) {
        return
      }
      $('#deleteModal').modal({
        show: true,
        backdrop: false
      })
    }
    else {
      this.commonService.infoToast("Please select client to delete.")
    }
  }


  /* -=-=-=-=-=--=-=- Delete client List -=-=-=-=-=-=-=- */
  deleteClient() {
    let apiReqUrl = "admin/deleteClient"
    var apiReqData = {
      userId: this.deleteAdminId
    }
    console.log(apiReqData);
    this.commonService.showSpinner()
    this.apiService.deleteApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.clientList()
        this.deleteAdminId = []
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  timer: any
  addAdminId(id, e) {
    console.log(id, e.target.checked);
    if (e.target.checked) {
      this.deleteAdminId.push(id);
    } else {
      this.deleteAdminId.splice(this.deleteAdminId.indexOf(id), 1);
    }
    console.log(this.deleteAdminId);
  }
  searchText(e) {
    console.log(e.target.value);

    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 1
      me.clientList();
    }, 2000);
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
    this.clientList()
  }
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
  addRow(e) {
    this.pageSize = e.target.value
    this.currentPage = 1
    this.clientList()
  }

  editClient(id) {
    this.router.navigate([`/client/edit-client/${id}`])
  }
  CloseDeleteModal() {
    $('#deleteModal').modal('hide')
  }


  //------------------ export as excel for download file --------------//
  exportAsXLSX() {
    let apiReqBody = {
      'search': this.search,
      // fromDate: this.searchForm.value.fromDate,
      // toDate:this.searchForm.value.toDate,
      'limit': this.total
    };
    console.log(apiReqBody);

    let apiReqUrl = `admin/listClient`
    this.apiService.postFormDataApi(apiReqUrl, apiReqBody, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "Client Name": element.userName || element.firstName ? element.userName || element.firstName : "--",
            "Email": element.email ? element.email : "--",
            "User Type": element.userType ? element.userType : "--",
            "Status": element.status ? element.status : "--",
            "Order Date": element.updatedAt ? this.datepipe.transform(element.createdAt, "medium") : "--",
          };
          let array = dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Client Management");
      }
    })
  }

  //  client dashboard
  dashboard: any
  clientDashboard() {
    let url = "admin/clientDashbord"
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
}
