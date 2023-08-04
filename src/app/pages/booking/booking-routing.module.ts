import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItineraryComponent } from './component/itinerary/itinerary.component';
import { BookingComponent } from './component/booking/booking.component';
import { MyBookingComponent } from './component/my-booking/my-booking.component';


const routes: Routes = [
  {
    path: 'itinerary',
    component: ItineraryComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'my-booking',
    component: MyBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
