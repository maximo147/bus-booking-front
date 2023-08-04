import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeSeatComponent } from './component/type-seat/type-seat.component';
import { TypeSeatDetailComponent } from './component/type-seat-detail/type-seat-detail.component';
import { BusComponent } from './component/bus/bus.component';

const routes: Routes = [
  {
    path: 'type-seat',
    component: TypeSeatComponent
  },
  {
    path: 'type-seat-detail',
    component: TypeSeatDetailComponent
  },
  {
    path: 'bus',
    component: BusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusesRoutingModule { }
