
import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebSocketService } from "./web-socket.service";
import { map } from "rxjs/operators";
import { SendMessage, Typing } from "../model/chat.model";

const CHAT_URL = 'wss://echo.websocket.org/';

export interface Message {
  user: string;
  messageContent: string;
}

const host = '127.0.01'
const port = '3000'
const URL = `ws://${host}:${port}/`;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private wscService: WebSocketService) {}

  public sendMessage(payload: SendMessage){
    this.wscService.sendMessage(payload)
  }

  public typing(valorTyping: Typing){
    this.wscService.sendTyping(valorTyping)
  }

}