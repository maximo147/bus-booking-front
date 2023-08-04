import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeSeatDetailResponse } from '../response/type-seat-detail.response';
import { CreateTypeSeatDetailDto, UpdateTypeSeatDetailDto } from '../dto/type-seat-detail.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeSeatDetailService {
  constructor(
    private _http: HttpClient
  ) { }

  public getAllTypeSeatDetail(): Observable<TypeSeatDetailResponse>{
    return this._http.get<TypeSeatDetailResponse>(environment.server + environment.buses.TypeSeatDetail.list)
  }

  public getById(id: string): Observable<TypeSeatDetailResponse>{
    return this._http.get<TypeSeatDetailResponse>(environment.server + environment.buses.TypeSeatDetail.retrieve + id)
  }
    
  public create(body: CreateTypeSeatDetailDto): Observable<TypeSeatDetailResponse>{
    return this._http.post<TypeSeatDetailResponse>(environment.server + environment.buses.TypeSeatDetail.register, body)
  }

  public update(body: UpdateTypeSeatDetailDto, id: string): Observable<TypeSeatDetailResponse>{
    return this._http.patch<TypeSeatDetailResponse>(environment.server + environment.buses.TypeSeatDetail.update + id, body)
  }

  public delete(id: string): Observable<TypeSeatDetailResponse>{
    return this._http.delete<TypeSeatDetailResponse>(environment.server + environment.buses.TypeSeatDetail.delete + id)
  }

  public deleteByIdBus(id: string): Observable<TypeSeatDetailResponse>{
    console.log(environment.server + environment.buses.TypeSeatDetail.deleteByIdBus + id);
    
    return this._http.delete<TypeSeatDetailResponse>(environment.server + environment.buses.TypeSeatDetail.deleteByIdBus + id)
  }

  public getAllByPlate(id: string): Observable<TypeSeatDetailResponse>{
    return this._http.get<TypeSeatDetailResponse>(environment.server + environment.buses.TypeSeatDetail.getAllByPlate + id)
  }

}
