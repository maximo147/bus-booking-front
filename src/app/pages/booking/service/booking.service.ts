import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto';
import { BookingResponse } from '../response/booking.response';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(
    private _http: HttpClient
  ) { }

  public getAllBooking(): Observable<BookingResponse>{
    return this._http.get<BookingResponse>(environment.server + environment.booking.booking.list)
  }

  public getById(id: string): Observable<BookingResponse>{
    return this._http.get<BookingResponse>(environment.server + environment.booking.booking.retrieve + id)
  }
    
  public create(body: any): Observable<BookingResponse>{
    return this._http.post<BookingResponse>(environment.server + environment.booking.booking.register, body)
  }

  public update(body: UpdateBookingDto, id: string): Observable<BookingResponse>{
    return this._http.patch<BookingResponse>(environment.server + environment.booking.booking.update + id, body)
  }

  public delete(id: string): Observable<BookingResponse>{
    return this._http.delete<BookingResponse>(environment.server + environment.booking.booking.delete + id)
  }


  
}
