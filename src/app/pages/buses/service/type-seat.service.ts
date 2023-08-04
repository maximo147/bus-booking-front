import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeSeatResponse } from '../response/type-seat.response';
import { CreateTypeSeatDto, UpdateTypeSeatDto } from '../dto/type-seat.dto';

@Injectable({
  providedIn: 'root'
})
export class TypeSeatService {
  
  constructor(
    private _http: HttpClient
  ) { }

  public getAllTypeSeat(): Observable<TypeSeatResponse>{
    return this._http.get<TypeSeatResponse>(environment.server + environment.buses.typeSeat.list)
  }

  public getById(id: string): Observable<TypeSeatResponse>{
    return this._http.get<TypeSeatResponse>(environment.server + environment.buses.typeSeat.retrieve + id)
  }
    
  public create(body: CreateTypeSeatDto): Observable<TypeSeatResponse>{
    return this._http.post<TypeSeatResponse>(environment.server + environment.buses.typeSeat.register, body)
  }

  public update(body: UpdateTypeSeatDto, id: string): Observable<TypeSeatResponse>{
    return this._http.patch<TypeSeatResponse>(environment.server + environment.buses.typeSeat.update + id, body)
  }

  public delete(id: string): Observable<TypeSeatResponse>{
    return this._http.delete<TypeSeatResponse>(environment.server + environment.buses.typeSeat.delete + id)
  }
}
