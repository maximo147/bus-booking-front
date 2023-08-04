import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { BehaviorSubject } from "rxjs";


@Injectable()
export class BookingSocketService {
    private _obj$ = new BehaviorSubject<any>([])
    public _obj = this._obj$.asObservable()

    constructor(private socket: Socket) {
        socket.fromEvent('cart-data2').subscribe((message: any) => {
            this.setDataSuscribe(message)
        })
    }

    setDataSuscribe(message: any) {
        //if(message.length !== 0){
            console.log(message);
            
        let state = message.filter(x => x.user.id_user === localStorage.getItem('id'))
        this._obj$.next(state)
        return state
        //}
    }

    sendData(data: string) {
        this.socket.emit('cart-data', data)
    }
}