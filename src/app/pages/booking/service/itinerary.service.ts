import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItineraryResponse } from '../response/itinerary.response';
import { CreateItineraryDto, UpdateItineraryDto } from '../dto/itinerary.dto';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  constructor(
    private _http: HttpClient
  ) { }

  public getAllItinerary(): Observable<ItineraryResponse>{
    return this._http.get<ItineraryResponse>(environment.server + environment.booking.itinerary.list)
  }

  public getById(id: string): Observable<ItineraryResponse>{
    return this._http.get<ItineraryResponse>(environment.server + environment.booking.itinerary.retrieve + id)
  }
    
  public create(body: CreateItineraryDto): Observable<ItineraryResponse>{
    return this._http.post<ItineraryResponse>(environment.server + environment.booking.itinerary.register, body)
  }

  public update(body: UpdateItineraryDto, id: string): Observable<ItineraryResponse>{
    return this._http.patch<ItineraryResponse>(environment.server + environment.booking.itinerary.update + id, body)
  }

  public delete(id: string): Observable<ItineraryResponse>{
    return this._http.delete<ItineraryResponse>(environment.server + environment.booking.itinerary.delete + id)
  }


  
}
