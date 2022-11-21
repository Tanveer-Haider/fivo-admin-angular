import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MultiSelectDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[MultiSelectDropdownComponent]
})
export class ShareModule { }
