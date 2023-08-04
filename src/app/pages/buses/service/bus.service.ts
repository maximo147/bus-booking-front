import { Injectable } from '@angular/core';
import { BusResponse } from '../response/bus.response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateBusDto, UpdateBusDto } from '../dto/bus.dto';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  constructor(
    private _http: HttpClient
  ) { }

  public getAllBus(): Observable<BusResponse>{
    return this._http.get<BusResponse>(environment.server + environment.buses.bus.list)
  }

  public getById(id: string): Observable<BusResponse>{
    return this._http.get<BusResponse>(environment.server + environment.buses.bus.retrieve + id)
  }
    
  public create(body: CreateBusDto): Observable<BusResponse>{
    return this._http.post<BusResponse>(environment.server + environment.buses.bus.register, body)
  }

  public update(body: UpdateBusDto, id: string): Observable<BusResponse>{
    return this._http.patch<BusResponse>(environment.server + environment.buses.bus.update + id, body)
  }

  public delete(id: string): Observable<BusResponse>{
    return this._http.delete<BusResponse>(environment.server + environment.buses.bus.delete + id)
  }
}
