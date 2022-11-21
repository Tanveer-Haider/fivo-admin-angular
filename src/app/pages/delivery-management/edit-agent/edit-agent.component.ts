import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ImageCroppedEvent, LoadedImage } from "ngx-image-cropper";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ApiFunctionalityService } from "src/app/Services/api-functionality.service";
import { CommonService, CountryCode } from "src/app/Services/common.service";
declare var $
@Component({
  selector: "app-edit-agent",
  templateUrl: "./edit-agent.component.html",
  styleUrls: ["./edit-agent.component.css"],
})
export class EditAgentComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  deliverylist = [];
  agentForm;
  imageuploaded: boolean = false;
  image: any;
  agentId: any;
  regExName = /^[a-zA-Z ]{3,}$/i;
  regExEmail =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
  regExPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  regExMobileNumber = /(?!0+$)[A-Z0-9][0-9]{9}/i;
  myControl = new FormControl("+91");
  filteredOptions: Observable<CountryCode[]>;
  countryList = [];
  imgSrc: string;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: "_id",
    textField: "vehicleType",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 2,
    allowSearchFilter: true,
  };

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiFunctionalityService,
    public common: CommonService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.agentId = this.activatedRoute.snapshot.paramMap.get("id");
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    
      this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  reset(){
    this.croppedImage = ""
  }

  ngOnInit(): void {
    this.agentForm = this.formbuilder.group({
      agentType: ["", [Validators.required]],
      firstname: [""],
      surname: [""],
      companyName: ["", [Validators.required]],
      vechicleType: ["", [Validators.required]],
      commission: ["", [Validators.required]],
      NRCNumber: [""],
      registrationNumber: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phoneNumber: [
        "",
        [Validators.required, Validators.pattern(this.regExMobileNumber)],
      ],
      email: ["", [Validators.required, Validators.pattern(this.regExEmail)]],
      // username:['',Validators.required, Validators.minLength(3)],
      document: [""],
      password: [
        "",
        [Validators.required, Validators.pattern(this.regExPassword)],
      ],
      confirmPassword: ["", [Validators.required]],
      deliverFee :[""],
      status : ["ACTIVE"]
    });
    this.agentForm.get("agentType").valueChanges.subscribe((val) => {
      if (val == "COMPANY") {
        this.agentForm.get("companyName").setValidators([Validators.required]);
        this.agentForm
          .get("registrationNumber")
          .setValidators([Validators.required]);
        this.agentForm.get("firstname").clearValidators();
        this.agentForm.get("surname").clearValidators();
        this.agentForm.get("NRCNumber").clearValidators();
      } else if (val == "INDIVIDUAL") {
        this.agentForm
          .get("firstname")
          .setValidators([
            Validators.required,
            Validators.pattern(this.regExName),
          ]);
        this.agentForm
          .get("surname")
          .setValidators([
            Validators.required,
            Validators.pattern(this.regExName),
          ]);
        this.agentForm.get("NRCNumber").setValidators([Validators.required]);
        this.agentForm.get("companyName").clearValidators();
        this.agentForm.get("registrationNumber").clearValidators();
      }
      this.agentForm.controls["companyName"].updateValueAndValidity();
      this.agentForm.controls["registrationNumber"].updateValueAndValidity();
      this.agentForm.controls["firstname"].updateValueAndValidity();
      this.agentForm.controls["surname"].updateValueAndValidity();
      this.agentForm.controls["NRCNumber"].updateValueAndValidity();
    });

    this.countryList = this.common.countryListJson;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => (value ? this._filter(value) : this.countryList.slice()))
    );

    console.log(this.agentForm);
    this.getDeliveryVehicleList();
    this.getAgent();
  }

  private _filter(value: string): CountryCode[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter((option) =>
      option.code.toLowerCase().includes(filterValue)
    );
    // return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));
  }

  /* -=-=-=-=-=-=-=- Edit Agent Api -=-=-=-=-=-=-=-=- */
  editAgent() {
    let i = 0;
    var serviceId = [];
    for (let item of this.agentForm.value.vechicleType) {
      serviceId[i] = item?._id;
      i++;
    }
    let apiReqUrl = `admin/editAgent?_id=${this.agentId}`;
    var apiReqData = {
      email: this.agentForm.value.email,
      password: this.agentForm.value.password,
      // "firstName": this.agentForm.value.firstname,
      // "surName": this.agentForm.value.surname,
      countryCode: this.myControl.value,
      mobileNumber: this.agentForm.value.phoneNumber,
      agentType: this.agentForm.value.agentType,
      // "companyRegistrationNo": this.agentForm.value.registrationNumber,
      // "nrcNumber": this.agentForm.value.NRCNumber,
      // "companyName": this.agentForm.value.companyName,
      isCommission: String(this.agentForm.value.commission || false),
      address: this.agentForm.value.address,
      verificationDocs: this.imageLinks,
      vehicleType: serviceId,
      status1 : this.agentForm.value.status,
    };
    if (this.agentForm.value.agentType == "INDIVIDUAL") {
      (apiReqData["firstName"] = this.agentForm.value.firstname),
        (apiReqData["surName"] = this.agentForm.value.surname),
        (apiReqData["nrcNumber"] = this.agentForm.value.NRCNumber);
    } else if (this.agentForm.value.agentType == "COMPANY") {
      (apiReqData["companyName"] = this.agentForm.value.companyName),
        (apiReqData["companyRegistrationNo"] =
          this.agentForm.value.registrationNumber);
    }
    console.log(apiReqData);

    this.common.showSpinner();
    this.apiService.putApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.router.navigate(["/delivery"]);
        this.common.hideSpinner();
        this.common.successToast(res.responseMessage);
      } else {
        this.common.hideSpinner();
        this.common.errorToast(res.responseMessage);
      }
    });
  }

  getDeliveryVehicleList() {
    let url = `admin/listVehicle`;
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.deliverylist = res.result;
        // this.getAgent()
        this.common.hideSpinner();
      }
    });
  }

  /* -=-=-=-=-=-=-=- Get Agent -=-=-=-=-=-=-=-=-=-- */

  getAgent() {
    let apiReqUrl = `admin/viewAgent?_id=${this.agentId}`;
    // this.common.showSpinner()
    this.apiService.getApi(apiReqUrl, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        var str2 = res.result.vehicleType;
        this.selectedItems = this.deliverylist.filter((response) => {
          return str2.includes(response?._id);
        });
        this.agentForm.patchValue({
          agentType: res?.result?.agentType,
          firstname: res?.result?.firstName,
          surname: res?.result?.surName,
          companyName: res?.result?.companyName,
          vechicleType: this.selectedItems,
          commission: res?.result?.isCommission,
          NRCNumber: res?.result?.nrcNumber,
          registrationNumber: res?.result?.companyRegistrationNo,
          address: res?.result?.address,
          phoneNumber: res?.result?.mobileNumber,
          email: res?.result?.email,
          deliverFee : res?.result?.feeAmount,
          status : res?.result?.status,
          // document:res?.result?.verificationDocs,
        });
        this.imageLinks = res?.result?.verificationDocs;
        this.myControl.patchValue(res?.result?.countryCode);
        this.getDeliveryVehicleList();
        this.common.hideSpinner();
      } else {
        this.common.hideSpinner();
        this.common.errorToast(res.responseMessage);
      }
    });
  }
  restForm(value) {
    if (value == "COMPANY") {
      this.agentForm.controls["firstname"].reset();
      this.agentForm.controls["surname"].reset();
      this.agentForm.controls["NRCNumber"].reset();
    } else if (value == "INDIVIDUAL") {
      this.agentForm.controls["companyName"].reset();
      this.agentForm.controls["registrationNumber"].reset();
    }
  }
  // uploadImg(event): void {
    // var img = $event.target.files[0];
    // this.imageuploaded = true;
    // if (event.target.files && event.target.files[0]) {
      // const max_height = 200;
      // const max_width = 200;
      // const reader = new FileReader();
      // reader.onload = (e: any) => {
      //   const image = new Image();
      //   image.src = e.target.result;
      //   image.onload = (rs) => {
      //     const img_height = rs.currentTarget["height"];
      //     const img_width = rs.currentTarget["width"];
      //     console.log(img_height);
      //     if (img_height <= max_height) {
      //       // this.uploadImageFunc(event.target.files[0]);
      //       $('#resizeImageModal').modal('show')
      //     this.fileChangeEvent(event)
      //     } else {
      //       this.image = "";
      //       // this.common.errorToast(
      //       //   "Please upload image of size max-height and max-width 200px only."
      //       // );
      //       $('#resizeImageModal').modal('show')
      //     this.fileChangeEvent(event)
      //     }
      //   };
      // };
      // reader.readAsDataURL(event.target.files[0]);
      // this.uploadImageFunc(event.target.files[0])
  //   }
  // }

  uploadImageFunc(img) {
    var image = new FormData();
    image.append("uploaded_file", img);
    var apiReqUrl = "product/uploadFile";
    this.common.showSpinner();
    this.apiService
      .postFormDataApi(apiReqUrl, image, 1)
      .subscribe((res: any) => {
        if (res["responseCode"] == "200") {
          this.imgSrc = res["result"]["url"];
          this.common.hideSpinner();
          this.common.successToast(res.responseMessage);
        } else {
          this.common.hideSpinner();
          this.common.errorToast(res.responseMessage);
        }
      });
  }
  onItemSelect(item: any) {}
  /* -=-=-=-=-=-=-=- Deselect Item -=-=-=-=-=-=-= */
  onDeSelect(item: any) {}

  /* -=-=-=-=-=-=-=- SelectAll Items -=-=-=-=-=-=-= */
  onSelectAll(items: any) {}
  /* -=-=-=-=-=-=-=- deSelectAll Items -=-=-=-=-=-=-= */
  onDeSelectAll(items: any) {}

  postImage: any = [];
imageLinks: any = [];
// multiple document send
uploadImg(event) {
  this.postImage = [];
  var img = [];
  
  img = event.target.files;
  let url = "admin/uploadMultipleFile";
  const formData = new FormData();
  this.common.showSpinner()
  // formData.append("files",String(img));
  for(let i =0;i<event.target.files.length;i++){
     formData.append("files",event.target.files[i])
  }
  this.apiService.postFormDataApi(url, formData, 1).subscribe((res) => {
    console.log(res);
    this.common.hideSpinner()
    if (res["responseCode"] == 200) {
      this.imgSrc = res["result"]["mediaResult"];

      for(let i =0;i<res["result"]["mediaResult"].length;i++){
        this.imageLinks[i] = res["result"]["mediaResult"][i]["mediaUrl"]

     }


    } else {
      this.common.hideSpinner()
      this.common.errorToast("Can't Upload This File");
    }
  });
}
}
