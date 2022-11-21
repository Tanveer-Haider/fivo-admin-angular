import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { CommonService } from '../Services/common.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public commonService: CommonService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = 'something went wrong';
          this.commonService.hideSpinner();
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error["responseMessage"]}`;
          }
          else {
            console.log("interceptor error->", error);
            switch (error["error"]["responseCode"]) {
              case 400:
                // this.commonService.errorToast(error["responseMessage"]);
                break;
              case 401:
                this.commonService.errorToast('Your session has expired please login again.');
                this.commonService.onLogout()
                break;
              case 403:
                this.commonService.errorToast('Unauthorized Access.');
                break;
              case 500:
                this.commonService.errorToast('Internal Server Error.');
                break;
              case 404:
                break;
              default:
                this.commonService.errorToast(error.error["responseMessage"] || 'Something went wrong');
                break;
            }
          }
          return throwError(error);
        })
      )
  }
}
