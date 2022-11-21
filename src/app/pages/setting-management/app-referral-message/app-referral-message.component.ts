import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-app-referral-message',
  templateUrl: './app-referral-message.component.html',
  styleUrls: ['./app-referral-message.component.css']
})
export class AppReferralMessageComponent implements OnInit {
  bannerForm:FormGroup

  constructor(private apiService:ApiFunctionalityService, private commonService:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.bannerForm=new FormGroup({
      'message':new FormControl('', Validators.required)
    })
  }

  setReferralMessage(){

  }
  
}
