import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateBookingDetailDto, UpdateBookingDetailDto } from '../dto/booking-detail.dto';
import { BookingDetailResponse } from '../response/booking-detail.reponse';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailService {
  constructor(
    private _http: HttpClient
  ) { }

  public getAllBookingDetail(): Observable<BookingDetailResponse>{
    return this._http.get<BookingDetailResponse>(environment.server + environment.booking.bookingDetail.list)
  }

  public getById(id: string): Observable<BookingDetailResponse>{
    return this._http.get<BookingDetailResponse>(environment.server + environment.booking.bookingDetail.retrieve + id)
  }

  public getAllUser(id: string): Observable<BookingDetailResponse>{
    return this._http.get<BookingDetailResponse>(environment.server + environment.booking.bookingDetail.byUSer + id)
  }
    
  public create(body: CreateBookingDetailDto): Observable<BookingDetailResponse>{
    return this._http.post<BookingDetailResponse>(environment.server + environment.booking.bookingDetail.register, body)
  }

  public update(body: UpdateBookingDetailDto, id: string): Observable<BookingDetailResponse>{
    return this._http.patch<BookingDetailResponse>(environment.server + environment.booking.bookingDetail.update + id, body)
  }

  public delete(id: string): Observable<BookingDetailResponse>{
    return this._http.delete<BookingDetailResponse>(environment.server + environment.booking.bookingDetail.delete + id)
  }


  
}
