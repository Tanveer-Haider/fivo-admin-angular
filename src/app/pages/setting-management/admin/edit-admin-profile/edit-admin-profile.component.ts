import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService,CountryCode } from 'src/app/Services/common.service';

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.css']
})
export class EditAdminProfileComponent implements OnInit {
  myControl = new FormControl('+91');
  editForm:FormGroup
  editImage:any
  birthDate:boolean = true

  profileData: any;

  ProfileData: any = {userName : 'Admin',email : 'admin@gmail.com',countryCode : '+91', mobileNumber : '9999999999',address : 'Los Angeles'};

  imgSrc: any = 'assets/images/avatar-1.jpg';
  permissions:any
  countryList = []
  filteredOptions: Observable<CountryCode[]>;
  // regExName=/^[a-zA-Z ]{3,}$/i;
  regExEmail=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
  regExPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  regExMobileNumber=/(?!0+$)[A-Z0-9][0-9]{9}/i;

  constructor(private apiService:ApiFunctionalityService, public commonService:CommonService,private rout:Router) { }


  
  ngOnInit(): void {
    this.getProfile()
    this.editForm = new FormGroup({
      'userName': new FormControl('', [Validators.required]),
      'countryCode': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'phone': new FormControl('',[Validators.required,Validators.minLength(10)]),
      'image':new FormControl(''),
      'address' : new FormControl(''),
      'dob':new FormControl('')
    })
    this.countryList = this.commonService.countryListJson;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filter(value) : this.countryList.slice())),
    );
  }

  private _filter(value: string): CountryCode[] {
    const filterValue = value.toLowerCase();
    // console.log(this.countryList);
    
    return this.countryList.filter(option => option.code.toLowerCase().includes(filterValue));
    // return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));

  }

  getProfile(){
    return
    let url = `admin/getProfile`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe(res=>{
      if(res.responseCode==200){
        this.ProfileData=res.result
        this.commonService.hideSpinner()
        this.editForm.patchValue({
          userName:res.result.userName,
          countryCode:res.result.countryCode,
          email:res.result.email,
          phone:res.result.mobileNumber,
          address:res.result.address,
          dob:res.result.dateOfBirth
        })
        this.editImage = res.result.profilePic
        this.myControl.patchValue (res.result.countryCode)
        
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  uploadFile(image){
    let url = `product/uploadFile`
    let images = image.target.files[0]
    var apiReqData = new FormData();
    apiReqData.append('uploaded_file',images)
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(url,apiReqData,1).subscribe((res)=>{
      if(res['responseCode']==200){
        this.editImage = res["result"]["url"]
        this.commonService.hideSpinner()
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast("something went wrong.")
      }
    })
  }

  updateProfile(){
    return
    let url = `admin/editProfile`
    let data = {
      "userName": this.editForm.value.userName,
      "mobileNumber": this.editForm.value.phone,
      "email": this.editForm.value.email,
      "countryCode": this.myControl.value,
      "address": this.editForm.value.address,
      "dateOfBirth": this.editForm.value.dob,
      "profilePic":this.editImage
    }
    this.apiService.putApi(url,data,1).subscribe(res=>{
      if(res.responseCode==200){
        this.rout.navigate(['setting/view-admin-profile'])
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  

}
