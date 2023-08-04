import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './component/chat/chat.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from './service/chat.service';
import { WebSocketService } from './service/web-socket.service';
//import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';

const config: SocketIoConfig = { url: 'http://localhost:81', options: {} };

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule,
    NgbNavModule, 
    SocketIoModule.forRoot(config)
  ],
  providers: [ChatService, WebSocketService]
})
export class ChatModule { }
