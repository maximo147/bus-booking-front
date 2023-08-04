import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(x => x.UsersModule)
  },
  {
    path: 'buses',
    loadChildren: () => import('./buses/buses.module').then(x => x.BusesModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then(x => x.BookingModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(x => x.ChatModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
