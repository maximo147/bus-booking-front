import { Injectable } from '@angular/core';
import { ChartType } from 'ng-apexcharts';
import { Socket } from 'ngx-socket-io';
import * as Rj from 'rxjs';
import { SendMessage, Typing } from '../model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private _users$ = new Rj.BehaviorSubject<UserType[]>([
    {
      name: 'TypeScript',
      slogan: 'Soy muy estricto! 😉',
      avatar: 'https://cdn.worldvectorlogo.com/logos/typescript-2.svg',
      id: 'ts',
    },
    {
      name: 'JavaScript',
      slogan: 'El versatil de la casa 🤔',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
      id: 'js',
    },
    {
      name: 'Angular',
      slogan: 'Todo son modulos 👌',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      id: 'angular',
    },
    {
      name: 'NodeJS',
      slogan: 'El mejor compañero 🤣',
      avatar:
        'https://www.secret-source.eu/wp-content/uploads/2017/11/node-js-logo.jpg',
      id: 'nodejs',
    },
    {
      name: 'NestJs',
      slogan: 'hermano de angular 🆗',
      avatar:
        'https://symbols.getvecta.com/stencil_89/37_nestjs-icon.a67daec196.jpg',
      id: 'nodejs',
    },
    {
      name: 'ReactJs',
      slogan: 'Estoy en todos lados 😎',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png',
      id: 'reactjs',
    },
  ]);
  public users$ = this._users$.asObservable();

  private _chat$ = new Rj.BehaviorSubject<SendMessage[]>([]);
  public chat$ = this._chat$.asObservable();

  private _typing$ = new Rj.BehaviorSubject<Typing>(null);
  public typing$ = this._typing$.asObservable();


  private _room$ = new Rj.BehaviorSubject<string | null>(null);

  constructor(private socket: Socket) {
    socket.fromEvent('new_message').subscribe((message: any) => {
      this.setChat(message);
    });

    socket.fromEvent('typing').subscribe((typing: Typing) => {
      this.setTyping(typing)
    })

    socket.fromEvent('disconnect').subscribe(() => {
      const lastRoom = this._room$.getValue();
      if (lastRoom) this.joinRoom(lastRoom);
    });
  }

  public setUser(user: UserType): void {
    const current = this._users$.getValue();
    const state = [...current, user];
    this._users$.next(state);
  }

  public setChat(message: SendMessage): any {
    const current = this._chat$.getValue();
    const state = [...current, message];
    this._chat$.next(state);
    return state;
  }

  public setTyping(typing: Typing){
    this._typing$.next(typing)
    return typing
  }

  public initChat(): void {
    this._chat$.next([]);
  }

  // Enviar mensaje 
  sendMessage(payload: SendMessage) {
    //const roomCurrent = this._room$.getValue();
    //if (roomCurrent) {
      //payload = { ...payload, room: roomCurrent };
      this.socket.emit('event_message', payload); 
    //}
  }

  sendTyping(vaue: Typing){
    this.socket.emit('typing', vaue)
  }

  joinRoom(room: string): void {
    this._room$.next(room);
    this.socket.emit('event_join', room);
  }

  leaveRoom(): void {
    const room = this._room$.getValue();
    this.socket.emit('event_leave', room);
  }

  getMessage() {
    return this.socket.fromEvent('message');
  }
}


interface UserType {
  name: string;
  avatar: string;
  slogan: string;
  id: string;
}

interface ChatType {
  user: UserType;
  message: string;
}