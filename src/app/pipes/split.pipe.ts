import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value:any, ...args:any[]):any {
    if(value=='contactUs'){
      return "Contact Us";
      }
      else if(value=='termsConditions'){
        return "Terms & Conditions";
      }
      else if(value=='privacyPolicy'){
        return "Privacy Policy";
      }
      else if(value=='aboutUs'){
        return "About Us";
      }
      else if (value=='BLOCKED'){
        return "Inactive"
      }
      else{
        return "--";
      }
  }

}
