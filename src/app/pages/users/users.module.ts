import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { RoleComponent } from './component/role/role.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './component/user/user.component';



@NgModule({
  declarations: [
    RoleComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
