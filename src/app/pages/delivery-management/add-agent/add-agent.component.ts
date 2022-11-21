import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
// import { Address } from 'cluster';
import { Address } from "ngx-google-places-autocomplete/objects/address";

import { IDropdownSettings } from "ng-multiselect-dropdown";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { ApiFunctionalityService } from "src/app/Services/api-functionality.service";
import { CommonService, CountryCode } from "src/app/Services/common.service";
import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs";
import { ImageCroppedEvent, LoadedImage } from "ngx-image-cropper";
declare var $;
@Component({
  selector: "app-add-agent",
  templateUrl: "./add-agent.component.html",
  styleUrls: ["./add-agent.component.css"],
})
export class AddAgentComponent implements OnInit {
  @ViewChild("placesRef", { static: true }) placesRef: GooglePlaceDirective;

  dropdownList = [];
  selectedItems = [];
  deliverylist = [];
  agentForm;
  address: any;
  options: any = [];
  longitude: any;
  latitude: any;
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
  myControl = new FormControl("+91");
  filteredOptions: Observable<CountryCode[]>;
  countryList = [];
  imageuploaded: boolean = false;
  image: any;
  regExName = /^[a-zA-Z ]{3,}$/i;
  regExEmail =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
  regExPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  regExMobileNumber = /(?!0+$)[A-Z0-9][0-9]{9}/i;

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiFunctionalityService,
    public common: CommonService,
    private router: Router
  ) {}

  imageChangedEvent: any = "";
  croppedImage: any = "";

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
  reset() {
    this.croppedImage = "";
  }
  ngOnInit(): void {
    this.agentForm = this.formbuilder.group({
      agentType: ["", [Validators.required]],
      firstname: ["", [Validators.pattern(this.regExName)]],
      surname: ["", [Validators.pattern(this.regExName)]],
      // surname:['',Validators.required],
      companyName: ["", [Validators.required]],
      vechicleType: new FormArray([]),
      commission: [""],
      NRCNumber: [""],
      registrationNumber: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phoneNumber: [
        "",
        [Validators.required, Validators.pattern(this.regExMobileNumber)],
      ],
      email: ["", [Validators.required, Validators.pattern(this.regExEmail)]],
      // username:['',[Validators.required, Validators.minLength(3)]],
      document: ["", [Validators.required]],
      password: [
        "",
        [Validators.required, Validators.pattern(this.regExPassword)],
      ],
      confirmPassword: ["", [Validators.required]],
      deliverFee: [""],
      status: ["ACTIVE"],
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

    this.getDeliveryVehicleList();
  }

  private _filter(value: string): CountryCode[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter((option) =>
      option.code.toLowerCase().includes(filterValue)
    );
    // return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));
  }

  public handleAddressChange(address: Address) {
    this.options = [];
    this.address = address.formatted_address;

    this.longitude = address.geometry.location.lng();
    this.latitude = address.geometry.location.lat();

    this.options[0] = Number(address.geometry.location.lat());
    this.options[1] = Number(address.geometry.location.lng());
  }

  getDeliveryVehicleList() {
    let url = `admin/listVehicle`;
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.deliverylist = res.result;
        this.common.hideSpinner();
      }
    });
  }

  /* -=-=-=-=-=-=-=- Add Agent Api -=-=-=-=-=-=-=-=- */
  addAgent() {
    let apiReqUrl = "admin/addAgent";
    var apiReqData = {
      email: this.agentForm.value.email,
      password: this.agentForm.value.password,
      // "firstName": this.agentForm.value.firstname,
      // "surName": this.agentForm.value.surname ,
      countryCode: this.myControl.value,
      mobileNumber: this.agentForm.value.phoneNumber,
      agentType: this.agentForm.value.agentType,
      // "companyRegistrationNo": this.agentForm.value.registrationNumber,
      // "nrcNumber": this.agentForm.value.NRCNumber ,
      // "companyName": this.agentForm.value.companyName,
      isCommission: String(this.agentForm.value.commission || false),
      address: this.agentForm.value.address,
      verificationDocs: this.imageLinks,
      vehicleType: this.agentForm.value.vechicleType,
      status1: this.agentForm.value.status,
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
    this.apiService.postApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.router.navigate(["/delivery"]);
        this.common.hideSpinner();
        this.common.successToast(res.responseMessage);
      } else {
        this.common.hideSpinner();
        this.common.errorToast(res.responseMessage);
      }
    });
    console.log(this.agentForm.value);
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
  //   image.onload = rs => {
  //     const img_height = rs.currentTarget['height'];
  //     const img_width = rs.currentTarget['width'];
  //     console.log(img_height);
  //     if (img_height <= max_height ) {
  //       //  this.uploadImageFunc(event.target.files[0]);
  //       $('#resizeImageModal').modal('show')
  //       this.fileChangeEvent(event)
  //     } else {
  //       this.image = ''
  //       // this.common.errorToast('Please upload image of size max-height and max-width 200px only.')
  //       $('#resizeImageModal').modal('show')
  //       this.fileChangeEvent(event)

  //     }
  //   };
  // };
  // reader.readAsDataURL(event.target.files[0]);
  // this.uploadImageFunc(event.target.files[0])
  // }
  // this.uploadImageFunc(img);
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
          console.log(this.imgSrc);
          this.common.hideSpinner();
          this.common.successToast(res.responseMessage);
        } else {
          this.common.hideSpinner();
          this.common.errorToast(res.responseMessage);
        }
      });
  }
  onItemSelect(item: any) {
    console.log(item.item_text);
    const checkbox: FormArray = this.agentForm.get("vechicleType") as FormArray;
    console.log(checkbox);

    checkbox.push(new FormControl(item._id));
  }
  /* -=-=-=-=-=-=-=- Deselect Item -=-=-=-=-=-=-= */
  onDeSelect(item: any) {
    const checkbox: FormArray = this.agentForm.get("vechicleType") as FormArray;
    const index = checkbox.controls.findIndex((x) => x.value === item._id);
    checkbox.removeAt(index);
  }

  /* -=-=-=-=-=-=-=- SelectAll Items -=-=-=-=-=-=-= */
  onSelectAll(items: any) {
    const checkbox: FormArray = this.agentForm.get("vechicleType") as FormArray;
    items.forEach((element) => {
      checkbox.push(new FormControl(element._id));
    });
  }
  /* -=-=-=-=-=-=-=- deSelectAll Items -=-=-=-=-=-=-= */
  onDeSelectAll(items: any) {
    const checkbox: FormArray = this.agentForm.get("vechicleType") as FormArray;
    checkbox.clear();
  }

  postImage: any = [];
  imageLinks: any = [];
  // multiple document send
  filesName: any = [];
  uploadImg(event) {
    console.log("-=-=-=-=-=-=", event.target.files[0].name);
    this.filesName = []
    this.filesName = event.target.files;
    this.postImage = [];
    var img = [];
   
    this.imageLinks = []

    img = event.target.files;
    let url = "admin/uploadMultipleFile";
    this.common.showSpinner();
    const formData = new FormData();
    // formData.append("files",String(img));
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("files", event.target.files[i]);
    }
    this.apiService.postFormDataApi(url, formData, 1).subscribe((res) => {
      console.log(res);
      this.common.hideSpinner();
      if (res["responseCode"] == 200) {
        this.imgSrc = res["result"]["mediaResult"];

        for (let i = 0; i < res["result"]["mediaResult"].length; i++) {
          this.imageLinks[i] = res["result"]["mediaResult"][i]["mediaUrl"];
        }
      } else {
        this.common.hideSpinner();
        this.common.errorToast("Can't Upload This File");
      }
    });
  }

  removeImage(idx) {
    console.log(idx);
    this.imageLinks.splice(idx, 1);
    console.log(this.imageLinks);
    // this.filesName.splice(idx, 1);
    console.log(this.filesName);

  }
}
