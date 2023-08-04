import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ChatMessage, ChatUser } from './chat.model';
import { ChatService } from '../../service/chat.service';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { WebSocketService } from '../../service/web-socket.service';
import { debounce, debounceTime, last, map, takeLast } from 'rxjs/operators';
import { SendMessage, Typing } from '../../model/chat.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollEle') scrollEle;
  @ViewChild('scrollRef') scrollRef;


  username = localStorage.getItem('username')
  public chat$ = this.webSocketService.chat$
  public typing$ = this.webSocketService.typing$

  subject: Subject<any> = new Subject()

  chatData: ChatUser[] = [];
  chatMessagesData: ChatMessage[] = [];
  formData: UntypedFormGroup;

  typing: Typing = {
    value: false,
    user: ''
  }

  valueRecieve: Typing

  constructor(
    public formBuilder: UntypedFormBuilder,
    private chatService: ChatService,
    private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.chat$.subscribe(x => {
      this.onListScroll()
    })

    this.typing$.subscribe(x => {
      this.valueRecieve = x
    })

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this.formData.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.chatService.typing({ value: false, user: this.username });
      });

    this.onListScroll();
    this._fetchData();
  }

  sendMsg() {
    const message = this.formData.get('message').value;
    if (message.length > 0) {
      const send: SendMessage = {
        message: message,
        user: this.username,
        date: new Date().toLocaleTimeString(),
        room: '465654514545'
      }
      this.chatService.sendMessage(send)
      this.formData.get('message').setValue('')
    }

  }

  ngAfterViewInit() {
    this.scrollEle.SimpleBar.getScrollElement().scrollTop = 100;
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 200;
  }

  get form() {
    return this.formData.controls;
  }

  private _fetchData() {
    this.chatData = this.chatData;
    this.chatMessagesData = this.chatMessagesData;
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop = this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  nowriting() {
    this.chatService.typing({ value: true, user: this.username });
  }

}
