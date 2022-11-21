import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { filter } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  // host: {
  //   "(window:resize)":"onWindowResize($event)"
  // }
})
export class SideBarComponent implements OnInit {
  sidebarActive: any;
  activeNavigate: any
  sidemenu: any = [
    { "id": 1, "routerLink": "/dashboard", "icon": "fa fa-dashboard", permissionKey: 'Dashboard', "Name": "Dashboard" },
    // { "id": 2, "routerLink": "/order", "icon": "fa fa-first-order", permissionKey: '', "Name": "Order Management" },

    {
      "id": 3, "routerLink": "/admin", "icon": "fa fa-user", permissionKey: '', "Name": "Administration", "subNameList": [
        { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Admin List" },
        { "id": 2, "routerLink": "/add-admin", permissionKey: 'Add', "subName": "Add Admin" }
      ]
    },
    { "id": 4, "routerLink": "/setting/slider-image", "icon": "fa fa-picture-o", permissionKey: 'Dashboard', "Name": "Slider Images" },

    // {
    //   "id": 4, "routerLink": "/client", "icon": "fa fa-users", permissionKey: 'clientsManagement', "Name": "Clients", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Client List" },
    //     { "id": 2, "routerLink": "/add-client", permissionKey: 'Add', "subName": "Add Client" }
    //   ]
    // },
    // {
    //   "id": 5, "routerLink": "/expert", "icon": "fa fa-users", permissionKey: 'expertsManagement', "Name": "Experts", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Expert List" },
    //     { "id": 2, "routerLink": "/add-expert", permissionKey: 'Add', "subName": "Add Expert" }
    //   ]
    // },
    // {
    //   "id": 6, "routerLink": "/delivery", "icon": "fa fa-motorcycle", permissionKey: 'deliveryManagement', "Name": "Delivery Agents", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Agent List" },
    //     { "id": 2, "routerLink": "/add-agent", permissionKey: 'Add', "subName": "Add Agent" }
    //   ]
    // },
    // {
    //   "id": 7, "routerLink": "/inventory", "icon": "fa fa-product-hunt", permissionKey: 'inventoryManagement', "Name": "Inventory Management", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Product List" },
    //     { "id": 2, "routerLink": "/add-product", permissionKey: 'Add', "subName": "Add Product" }
    //   ]
    // },
    // {
    //   "id": 8, "routerLink": "/services", "icon": "fa fa-rocket", permissionKey: 'serviceManagement', "Name": "Service Management", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Service List" },
    //     { "id": 2, "routerLink": "/add-service", permissionKey: 'Add', "subName": "Add Service" }
    //   ]
    // },
    // {
    //   "id": 9, "routerLink": "/advert", "icon": "fa fa-user", permissionKey: 'advertManagement', "Name": "Advert Management", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Advert List" },
    //     { "id": 2, "routerLink": "/add-advert", permissionKey: 'Add', "subName": "Add Advert" }
    //   ]
    // },
    // { "id": 10, "routerLink": "/jobs", "icon": "fa fa-users", permissionKey: 'jobManagement', "Name": "Service Orders" },
    // { "id": 11, "routerLink": "/materials", "icon": "fa fa-user", permissionKey: 'materialOrderManagement', "Name": "Material Orders" },
    // { "id": 12, "routerLink": "/earnings", "icon": "fa fa-money", permissionKey: 'earnings', "Name": "Earnings" },
    // {
    //   "id": 13, "routerLink": "/category", "icon": "fa fa-list", permissionKey: 'categoryManagement', "Name": "Categories", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Category List" },
    //     { "id": 2, "routerLink": "/add-category", permissionKey: 'Add', "subName": "Add Category" }
    //   ]
    // },
    // {
    //   "id": 14, "routerLink": "/coupons", "icon": "fa fa-gift", permissionKey: 'couponManagement', "Name": "Coupons", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Coupon List" },
    //     { "id": 2, "routerLink": "/add-coupons", permissionKey: 'Add', "subName": "Add Coupon" }
    //   ]
    // },
    // {
    //   "id": 15, "routerLink": "/discount", "icon": "fa fa-certificate", permissionKey: '', "Name": "Discounts", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Discount List" },
    //     { "id": 2, "routerLink": "/add-discount", permissionKey: 'Add', "subName": "Add Discount" }
    //   ]
    // },
    // {
    //   "id": 16, "routerLink": "/notification", "icon": "fa fa-bell", permissionKey: 'pushNotification', "Name": "Push Notification", "subNameList": [
    //     { "id": 1, "routerLink": "", permissionKey: 'List', "subName": "Send Notification" },
    //     { "id": 2, "routerLink": "/template-list", permissionKey: 'List', "subName": "Templates" }
    //   ]
    // },
    // { "id": 17, "routerLink": "/auto-notification", "icon": "fa fa-bell", permissionKey: 'autoNotifications', "Name": "Auto Notification" },
    // { "id": 18, "routerLink": "/reviews", "icon": "fa fa-star", permissionKey: 'reviews', "Name": "Reviews" },
    // { "id": 19, "routerLink": "/inbox", "icon": "fa fa-inbox", permissionKey: 'inbox', "Name": "Inbox" },
    { "id": 20, "routerLink": "/static-content", "icon": "fa fa-file", permissionKey: 'Static Content', "Name": "Static Content" },
    { "id": 21, "routerLink": "/faq", "icon": "fa fa-question-circle", permissionKey: "FAQ's", "Name": "FAQ's" },
    {
      "id": 22, "routerLink": "/setting", "icon": "fa fa-gear", permissionKey: 'settings', "Name": "Settings", "subNameList": [
        { "id": 1, "routerLink": "/view-admin-profile", permissionKey: 'List', "subName": "Admin Profile" },
      
        // { "id": 6, "routerLink": "/delivery-vehicle-list", permissionKey: 'List', "subName": "Delivery Vehicle Type" },
        // { "id": 6, "routerLink": "/system-email", permissionKey: 'List', "subName": "System Email" },
        // { "id": 6, "routerLink": "/sevice-area", permissionKey: 'List', "subName": "Service Areas" },

        // { "id": 8, "routerLink": "/home-screen", permissionKey: 'List', "subName": "Home Screen" },
        // { "id": 9, "routerLink": "/background", permissionKey: 'List', "subName": "Background Screen" },
        // { "id": 10, "routerLink": "/logo", permissionKey: 'List', "subName": "Logo" },
        // { "id": 11, "routerLink": "/slider-image", permissionKey: 'List', "subName": "Slider Images" },

        // { "id": 13, "routerLink": "/reward-amount", permissionKey: 'List', "subName": "Reward Amounts" },

        { "id": 15, "routerLink": "/admin-season", permissionKey: 'List', "subName": "Admin Session" }
        // { "id": 16, "routerLink": "/social-network", permissionKey: 'List', "subName": "Social Networks" },
        // { "id": 17, "routerLink": "/currency-symbol", permissionKey: 'List', "subName": "Currency Symbol" },
        // { "id": 18, "routerLink": "/cancellation-reason", permissionKey: 'List', "subName": "Cancellation Management" },
        // { "id": 2, "routerLink": "/fee-management", permissionKey: 'List', "subName": "Active/Deactive Category" },
      ]
    },
  ]

  permission: any;
  userDetails: any;

  constructor(public router: Router, public commonService: CommonService, public apiService: ApiFunctionalityService) {
    router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: NavigationStart) => {
      this.activeNavigate = event.url
      this.sidemenu.filter((element) => {
        if (element.routerLink == event.url) {
          this.sidebarActive = element.routerLink
        }
      })
    })

  }


  ngOnInit(): void {
    $('.btn-toggle,.close_panel').click(() => {
      $('body').toggleClass('toggle-wrapper');
    });
    $('.sidebar').hover(() => {
     
      if($('body').hasClass('toggle-wrapper')){
        $('body').toggleClass('toggle-wrapper');

      }
      else{

      }
      
    });

    return
    let sidemenu;
    this.commonService.loginData.subscribe((res: any) => {
      if (res) {
        this.userDetails = res
        this.permission = res.permission
        // check permission
        this.checkPermission()
      }
    })

    if (this.commonService.isLoggedIn()) {
      this.getProfile()
    }
  }

  onSelect(sidebar) {
    this.sidebarActive = sidebar
  }

  nagivateToComponent(link, activeName?) {
    this.sidebarActive = activeName
    this.router.navigate([link])
  }

  // get admin profile
  getProfile() {
    this.commonService.loginData.next('res.result')
return
    let url = `admin/getProfile`
    this.apiService.getApi(url, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.commonService.loginData.next('res.result')
      }
    })
  }


  checkPermission() {
    let sidemenu = this.sidemenu
    localStorage.setItem('permission', JSON.stringify(this.permission))
    localStorage.setItem('userType', this.userDetails.userType)
    console.log("permission->", this.permission)
    if (this.userDetails.userType == 'SUBADMIN') {
      var permissionArray = []
      if (this.permission.advertManagement.length != 0) {
        permissionArray.push("advertManagement")
      }
      if (this.permission.categoryManagement.length != 0) {
        permissionArray.push("categoryManagement")
      }
      if (this.permission.clientsManagement.length != 0) {
        permissionArray.push("clientsManagement")
      }
      if (this.permission.couponManagement.length != 0) {
        permissionArray.push("couponManagement")
      }
      if (this.permission.deliveryManagement.length != 0) {
        permissionArray.push("deliveryManagement")
      }
      if (this.permission.earnings.length != 0) {
        permissionArray.push("earnings")
      }
      if (this.permission.expertsManagement.length != 0) {
        permissionArray.push("expertsManagement")
      }
      if (this.permission.inventoryManagement.length != 0) {
        permissionArray.push("inventoryManagement")
      }
      if (this.permission.jobManagement.length != 0) {
        permissionArray.push("jobManagement")
      }
      if (this.permission.expertsManagement.length != 0) {
        permissionArray.push("expertsManagement")
      }
      if (this.permission.materialOrderManagement.length != 0) {
        permissionArray.push("materialOrderManagement")
      }
      if (this.permission.pushNotification.length != 0) {
        permissionArray.push("pushNotification")
      }
      if (this.permission.serviceManagement.length != 0) {
        permissionArray.push("serviceManagement")
      }
      if (this.permission.autoNotifications.length != 0) {
        permissionArray.push("autoNotifications")
      }
      if (this.permission.reviews.length != 0) {
        permissionArray.push("reviews")
      }
      if (this.permission.inbox.length != 0) {
        permissionArray.push("inbox")
      }
      if (this.permission.settings.length != 0) {
        permissionArray.push("settings")
      }
      
      permissionArray.push("Dashboard", "FAQ's", "Static Content")
      // console.log(permissionArray)
      let arr = []
      sidemenu.map(o => {
        let check = permissionArray.includes(o.permissionKey)
        if (check == true) {
          if (this.permission[o.permissionKey]) {
            let subPermission = this.permission[o.permissionKey]
            if (!subPermission.includes('Add')) {
              if (o.subNameList) {
                let arr2 = [];
                for (let i = 0; i < o.subNameList.length; i++) {
                  if (o.subNameList[i].permissionKey == "Add") {
                    continue
                  }
                  else {
                    arr2.push(o.subNameList[i])
                  }
                }
                o.subNameList = arr2
              }
            }
          }
          arr.push(o)
        }
      })
      this.sidemenu = arr
      console.log(this.sidemenu)
    }
  }

}
