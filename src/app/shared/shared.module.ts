import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';



@NgModule({
  declarations: [
    ModalComponent,
    TabComponent,
    TabsContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent
  ]
})
export class SharedModule { }
