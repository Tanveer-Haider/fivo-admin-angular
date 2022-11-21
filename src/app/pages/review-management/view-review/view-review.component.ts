import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  // selectedValue: number = 3;
  reviewId:any
  reviewData:any
  constructor(private apiService:ApiFunctionalityService,private commonService:CommonService, private router:Router ,private activateRoute:ActivatedRoute) { 
    // this.reviewId=this.activateRoute.snapshot.paramMap.get("id")
   this.activateRoute.queryParams.subscribe(res=>{
      this.reviewId = res.id 
    })
    console.log(this.reviewId);
  }

  ngOnInit(): void {
    this.viewReview()
  }

  viewReview(){
    let apiReqUrl=`admin/viewReview?_id=${this.reviewId}`
    this.commonService.showSpinner()
    this.apiService.getApi(apiReqUrl,1).subscribe((res:any)=>{
     if(res.responseCode==200){
       this.reviewData=res.result
       // console.log(res.result.docs);
      //  this.imgSrc=res.result.logoImage
       this.commonService.hideSpinner()
      //  this.commonService.successToast(res.responseMessage)
     }
     else{
       this.commonService.hideSpinner()
       this.commonService.errorToast(res.responseMessage)
     }
    })
   }



}
