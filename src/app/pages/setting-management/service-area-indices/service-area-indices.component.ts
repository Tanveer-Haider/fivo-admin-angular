import { Component, OnInit } from '@angular/core';
declare var $
@Component({
  selector: 'app-service-area-indices',
  templateUrl: './service-area-indices.component.html',
  styleUrls: ['./service-area-indices.component.css']
})
export class ServiceAreaIndicesComponent implements OnInit {
  pageSize : any = 10
  total = 10
  currentPage = 0
  listArray : any = []
  AgentHeader:any = [
    {"id":1,"name":"All","backgroundColor":"bg-green","icon":"fa fa-bars"},
  
  ]
  constructor() {
   
    
    
   }
   changePage(e){

   }
  ngOnInit(): void {
  }

  openDeleteModal(){
    $('#deleteModal').modal({
      show : true,
      backdrop : false
    })
  }

  

}
