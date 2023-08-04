import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRoleDto, UpdateRoleDto } from '../dto/role.dto';
import { RoleResponse } from '../response/role.response';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  constructor(
    private _http: HttpClient
  ) { }

  public getAllRole(): Observable<RoleResponse>{
    return this._http.get<RoleResponse>(environment.server + environment.users.role.list)
  }

  public getById(id: string): Observable<RoleResponse>{
    return this._http.get<RoleResponse>(environment.server + environment.users.role.retrieve + id)
  }
    
  public create(body: CreateRoleDto): Observable<RoleResponse>{
    return this._http.post<RoleResponse>(environment.server + environment.users.role.register, body)
  }

  public update(body: UpdateRoleDto, id: string): Observable<RoleResponse>{
    return this._http.patch<RoleResponse>(environment.server + environment.users.role.update + id, body)
  }

  public delete(id: string): Observable<RoleResponse>{
    return this._http.delete<RoleResponse>(environment.server + environment.users.role.delete + id)
  }

}
