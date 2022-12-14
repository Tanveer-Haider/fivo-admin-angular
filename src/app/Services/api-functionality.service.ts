import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiFunctionalityService {

  public baseURL = "https://finovac-node.onrender.com/api/v1/" // stagging
  // public baseURL = "  http://172.16.1.246:3028/api/v1/"
  // public baseURL = "http://172.16.11.134:3028/api/v1/" 

  constructor(public httpClient: HttpClient, private router: Router) { }

  getApi(endPointURL, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.get(this.baseURL + endPointURL, httpHeaders)
  }


  // ---------------- post Api Function ------------------- //
  postApi(endPointURL, data, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.post(this.baseURL + endPointURL, data, httpHeaders)
  }

  // ---------------- patch Api Function ------------------- //
  patchApi(endPointURL, data, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.patch(this.baseURL + endPointURL, data, httpHeaders)
  }

  // ------------------ put Api Function ----------------- //
  putApi(endPointURL, data, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.put(this.baseURL + endPointURL, data, httpHeaders)
  }

  // ------------------ put Api Function ----------------- //
  putFormDataApi(endPointURL, data, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.put(this.baseURL + endPointURL, data, httpHeaders)
  }

  postFormDataApi(endPoint, data, isHeader) {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
        }),
      };
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          token: localStorage.getItem("token"),
        }),
      };
    }
    return this.httpClient.post(this.baseURL + endPoint, data, httpHeaders);
  }

  // ------------------ delete Api Function -------------- //
  deleteApi(endPointURL, bodyData, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        }),
        body: bodyData
      }
    }
    return this.httpClient.delete(this.baseURL + endPointURL, httpHeaders)
  }

  // <!--   Logout    -->
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
