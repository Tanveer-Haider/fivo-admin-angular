import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';


declare var $;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productId: any
  pageSize: any = 10
  total: any
  currentPage = 1
  categoryId: any
  categories = []
  customerDataExcel: any = [];
  action: any = 0
  deletePoductId: any = []
  timer: any
  search: any
  // checkbox : any =[]
  adminList: any = []
  selectAll: any
  listArray: any = []
  productDashboard: any
  useCurrency: any = localStorage.getItem("useCurrency")

  constructor(public commonService: CommonService, private apiService: ApiFunctionalityService, private route: Router, private datepipe: DatePipe) {
    console.log("product list component");

  }
  //  changePage(e){
  //   this.currentPage = e
  //  }
  ngOnInit(): void {
    this.getCategory()
    this.getProductList()
    this.getProductDashboard()
    this.expertDashboard()
  }

  getProductDashboard() {
    let url = `product/productDashboard`
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe(res => {
      if (res.responseCode == 200) {
        this.productDashboard = res.result.lowStock == null ? 0 : res.result.lowStock
        // this.productDashboard == null ? 0 : this.productDashboard ;
        console.log(this.productDashboard);

        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
  status: any = "ALL"
  filterStatus(e) {
    this.status = e
    this.currentPage = 1
    console.log(e);

    this.getProductList()
  }

  // get product list
  getProductList() {
    let url;
    // if(this.search){
    //    url = `product/listProduct?page=${this.currentPage}&limit=${this.pageSize}&search=${this.search}`
    // }
    // else if (this.categoryId){
    //   url = `product/listProduct?page=${this.currentPage}&limit=${this.pageSize}&categoryId=${this.categoryId}${this.status != 'ALL' ? '&stockStatus='+this.status : ''}`
    // }
    // else{
    url = `product/listProduct?page=${this.currentPage}&limit=${this.pageSize}${this.categoryId ? '&categoryId=' + this.categoryId : ''}${this.status != "ALL" ? '&stockStatus=' + this.status : ''}${this.search ? '&search=' + this.search : ''}`

    // url = `product/listProduct?page=${this.currentPage}&limit=${this.pageSize}${this.status != 'ALL' ? '&stockStatus='+this.status : ''}`
    // }

    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.listArray = res.result.docs
        this.total = res.result.total
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },
      (err) => {
        this.listArray = []
      })
  }

  openFilterModal() {
    this.search = ""
    $('#filterModal').modal('show')
  }
  selectCategory(item) {
    this.categoryId = item.target.value
    console.log(this.categoryId);
  }
  stockName: any
  selectStock(e) {
    this.status = e.target.value
    console.log(this.stockName)
  }

  filterList() {
    this.getProductList()

  }

  openDeleteModal(id) {
    this.deletePoductId = []
    this.deletePoductId[0] = id
    $('#deleteModal').modal('show')
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
      this.commonService.infoToast("Please select product to delete.")
    }
  }

  closeDeleteModal() {
    $('#deleteModal').modal('hide')
  }

  // delete product
  deleteProduct() {
    let url = `product/deleteAllProduct`
    let data = {
      "productId": this.deletePoductId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url, data, 1).subscribe(res => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.getProductList()
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


  // navigate to view product with id
  viewProduct(p_id) {
    this.route.navigate(['/inventory/view-product'], { queryParams: { product_id: p_id } })
  }

  // navigate to edit product with id
  editProduct(p_id) {
    this.route.navigate(['/inventory/edit-product'], { queryParams: { product_id: p_id } })
  }

  // get category id
  getCategory() {
    let url = `category/listCategory`
    this.apiService.postApi(url, {}, 1).subscribe(res => {
      if (res.responseCode == 200) {
        this.categories = res.result.docs
        console.log(this.categories);
      }
      else {
        this.commonService.errorToast("Don't have categories.")
      }
    })
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
      me.getProductList();
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
    this.getProductList()
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
    this.getProductList()

  }


  //------------------ export as excel for download file --------------//
  exportAsXLSX() {
    // let apiReqUrl=`product/listProduct?page=${this.currentPage}&limit=${this.total}${this.search ? "&search="+this.search : ''}`
    let apiReqUrl = `product/listProduct?page=${this.currentPage}${this.total ? "&limit=" + this.total : ""}${this.search ? "&search=" + this.search : ''}`
    console.log(apiReqUrl);
    this.apiService.getApi(apiReqUrl, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "SKU": element.sku ? element.sku : "--",
            "Item": element.item ? element.item : "--",
            "Category": element.categoryId?.categoryName ? element.categoryId?.categoryName : "--",
            "Brand": element.brand ? element.brand : "--",
            "Colour": element.color ? element.color : "--",
            "Size": element.size ? element.size : "--",
            "Price": element.price ? element.price : "--",
            "Stock": element.stock ? element.stock : "--",
            "Discount": element.discount ? element.discount : "--",
            "Stock Status": element.stockStatus ? element.stockStatus : "--",
          };
          let array = dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Inventory Management");
      }
    })
  }

  //  product dashboard
  dashboard: any
  expertDashboard() {
    let url = "product/productDashboard"
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
