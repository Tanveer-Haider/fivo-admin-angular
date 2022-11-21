import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent {


  @Input() list: any[];

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  @Output() shareCheckUncheckAll = new EventEmitter();
  @Output() checkUnCheckAllSubMenu = new EventEmitter();

  checkedList: any[];
  currentSelected: {};
  showDropDown: boolean;

  isMasterSel: boolean;

  constructor() {
    this.checkedList = [];
  }
  getSelectedValue(status: boolean, value: string) {
    if (status) {
      this.list.forEach(element => {

        let index = element.products.findIndex(x => x._id == value)
        if (index > -1) {
          element.products[index].checked = status
        }
      });
    }

    //share checked list
    // this.shareCheckedlist();

    //share individual selected item
    this.shareIndividualStatus();

    // check is all selected
    this.isAllSelected()
    // check is all selected sub menu
    this.isAllSelectedSubMenu()
    // this.shareCheckUncheckAllStatus()

    // call only this to send item list
    // this.checkUncheckAll() // only this function call on components
  }
  shareCheckedlist() {
    this.shareCheckedList.emit(this.checkedList);
  }
  shareIndividualStatus() {
    // this.shareIndividualCheckedList.emit(this.currentSelected);
    this.shareIndividualCheckedList.emit(this.list);
  }
  shareCheckUncheckAllStatus() {
    this.shareCheckUncheckAll.emit(this.list);
  }
  shareCheckUncheckAllSubMenuStatus() {
    this.checkUnCheckAllSubMenu.emit(this.list);
  }

  /**
   * for select all check box
   */
  // this.isMasterSel = false;
  isAllCheckedSelected: boolean;

  checkUncheckAll() {
    // for (var i = 0; i < this.list.length; i++) {
    //   this.list[i].checked = this.isAllCheckedSelected;
    // }
    this.list.forEach(element => {
      element.products.forEach(ele => {
        ele.checked = this.isAllCheckedSelected
      })
    });
    // this.getCheckedItemList();
    this.isAllSelected() // when click on select all it will check 
    this.isAllSelectedSubMenu() // when click on select all it will check all sub menu
    this.shareCheckUncheckAllStatus() // send all item to component
  }

  isAllSelected() {
    let checkedBoxCount = 0;
    let checkedTrueCount = 0;
    this.list.forEach(element => {
      checkedBoxCount = checkedBoxCount + element.products.filter(x => x.checked == true).length
      checkedTrueCount = checkedTrueCount + element.products.length
    })
    // this.list.every(function (item: any) {
    //   // return item.isSelected == true;
    // })
    if (checkedBoxCount == checkedTrueCount) {
      this.isAllCheckedSelected = true
    } else {
      this.isAllCheckedSelected = false
    }
    // this.getCheckedItemList();
  }

  // getCheckedItemList(){
  //   this.checkedCategoryList = [];
  //   for (var i = 0; i < this.categoryList.length; i++) {
  //     if(this.categoryList[i].isSelected)
  //     this.checkedCategoryList.push(this.categoryList[i]);
  //   }
  //   this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  // }

  /**
   * sub menu drop down 
   * we take @param index and make all sub menu of that index true or false based on @param status get 
   */

  checkUnCheckAllSubMenuValue(index, status: boolean) {
    /**
     * @param index get as 1, 2, 3 etc
     * @param status get as true or false based on checked or unchecked
     */
    this.list.forEach((element, idx) => {
      if (idx == index) {
        element.products.forEach(ele => {
          ele.checked = status

        })
        // this.isAllSelectedSubMenu(ele, idx) 
      }
    })
    this.isAllSelected() // when click on select all sub menu it will check for all selected or not
    // when click on select all it will check 
    // this.shareCheckUncheckAllStatusSubMenu() // send all item to component
    this.shareCheckUncheckAllSubMenuStatus() // send all item to component
  }

  isAllSelectedSubMenu() {
    this.list.forEach(element => {
      let checkedBoxCount = 0;
      let checkedTrueCount = 0;
      checkedBoxCount = checkedBoxCount + element.products.filter(x => x.checked == true).length
      checkedTrueCount = checkedTrueCount + element.products.length
      if (checkedBoxCount == checkedTrueCount) {
        element.category.checked = true
      } else {
        element.category.checked = false
      }
    })
  }
}
