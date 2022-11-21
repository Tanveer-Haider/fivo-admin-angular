import {

  Component,

  OnInit,

} from "@angular/core";

import { Chart } from "node_modules/chart.js";
import { ApiFunctionalityService } from "src/app/Services/api-functionality.service";
import { CommonService } from "src/app/Services/common.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-main-dashboard",
  templateUrl: "./main-dashboard.component.html",
  styleUrls: ["./main-dashboard.component.css"],
})
export class MainDashboardComponent implements OnInit {
  pageSize: any = 10;
  total: any;
  total_material: any
  currentPage = 0;
  listArray: any = [];
  pending_job_listArray = []
  pending_material_listArray = []
  useCurrency: any = localStorage.getItem("useCurrency")
  currentYear: any = new Date().getFullYear()

  Dashboard: any = [
    { id: 1, name: "All", backgroundColor: "bg-green", icon: "fa fa-bars" },
    { id: 2, name: "Pending", backgroundColor: "bg-pink", icon: "fa fa-tasks" },
    {
      id: 3,
      name: "Assigned",
      backgroundColor: "bg-yellow",
      icon: "fa fa-star",
    },
    {
      id: 4,
      name: "Started off",
      backgroundColor: "bg-light-green",
      icon: "fa fa-heart",
    },
    {
      id: 5,
      name: "Completed",
      backgroundColor: "bg-darkblue",
      icon: "fa fa-edit",
    },
    {
      id: 6,
      name: "Cancelled",
      backgroundColor: "bg-lightessblack",
      icon: "fa fa-times",
    },
  ];
  constructor(public commonService: CommonService, private apiService: ApiFunctionalityService, private router: Router) {

  }
  ngOnInit() {
    this.getDashboard()
    this.getMaterialJobList()
    this.getpendingJobList()
    this.getChartPoints()

  }


  getDashboard() {
    let url = `admin/mainDashbord`
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.listArray = res.result
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },
      (err: any) => {
        this.commonService.hideSpinner();

      })
  }


  getpendingJobList() {
    let url = `admin/pendingjobOrderList`
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.pending_job_listArray = res.result.results
        this.total = res.result.total
        this.commonService.hideSpinner()
      }
      else {
        this.commonService.hideSpinner()
      }
    })
  }



  getMaterialJobList() {
    let url = `admin/pendingMaterialorderList`
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.pending_material_listArray = res.result.results
        this.total_material = res.result.total
        this.commonService.hideSpinner()
      }
      else {
        this.commonService.hideSpinner()
      }
    })
  }

  navigateToView(id) {
    this.router.navigate(['/order/view-order'], { queryParams: { id: id } })
  }

  navigateToViewJobs(id) {
    this.router.navigate(['/jobs/view-job'], { queryParams: { id: id } })
  }
  ngAfterViewInit() {

  }
  changePage(e, list) {
    this.currentPage = e
    if (list == 'job') {
      this.getpendingJobList()
    }
    else if (list == 'material') {
      this.getMaterialJobList()
    }

  }
  serviceEarning : any = []
  materialEarning : any = []
  async getChartPoints() {
    let url = `admin/earningGraph?year=${this.currentYear}`
    this.commonService.showSpinner()
    this.serviceEarning = []
    this.materialEarning = []
    try {
      let res = await this.apiService.postApi(url,{}, 1).toPromise()
      if (res.responseCode == 200) {
        for(let item of res.result.docs){
          this.serviceEarning.push(item.totalEarning.servicetotal)
          this.materialEarning.push(item.totalEarning.materialTotal)

        }
        console.log(this.serviceEarning,this.materialEarning);
        
        this.commonService.hideSpinner()
        this.chart()
      }
      else {
        this.commonService.hideSpinner()

      }
    } catch (error) {

    }


  }

  chart() {
    var myChart = new Chart("myChart", {
      type: "line",
      showInLegend: false,
      toolTipContent: "{legendText}",
      data: {
        labels: [
          "Jan-" + this.currentYear,
          "Feb-" + this.currentYear,
          "Mar-" + this.currentYear,
          "Apr-" + this.currentYear,
          "May-" + this.currentYear,
          "Jun-" + this.currentYear,
          "Jul-" + this.currentYear,
          "Aug-" + this.currentYear,
          "Sep-" + this.currentYear,
          "Oct-" + this.currentYear,
          "Nov-" + this.currentYear,
          "Dec-" + this.currentYear,
        ],
        datasets: [
          {
            label: 'Service',
            data: this.serviceEarning,
            backgroundColor: "transparent",
            borderColor: "blue",
            borderWidth: 2,
            
          },
          {
            label: 'Materials',
            data: this.materialEarning,
            backgroundColor: "transparent",
            borderColor: "green",
            borderWidth: 2,
          },
        ],
      },
      options: {
        legend: {
          display: false,
         
        },
        maintainAspectRatio: false,

        scales: {
          yAxes: [
            {
              scaleLabel: {
                labelString: "Earning in " + this.useCurrency,
                display: true,
              },
              valueFormatString: "",
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                labelString: "Month",
                display: true,
              },
              valueFormatString: " ",
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

}
