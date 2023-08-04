import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserResponse } from '../response/user.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private _http: HttpClient
  ) { }

  public getAllUser(): Observable<UserResponse>{
    return this._http.get<UserResponse>(environment.server + environment.users.user.list)
  }

  public getById(id: string): Observable<UserResponse>{
    return this._http.get<UserResponse>(environment.server + environment.users.user.retrieve + id)
  }
    
  public create(body: CreateUserDto): Observable<UserResponse>{
    return this._http.post<UserResponse>(environment.server + environment.users.user.register, body)
  }

  public update(body: UpdateUserDto, id: string): Observable<UserResponse>{
    return this._http.patch<UserResponse>(environment.server + environment.users.user.update + id, body)
  }

  public delete(id: string): Observable<UserResponse>{
    return this._http.delete<UserResponse>(environment.server + environment.users.user.delete + id)
  }
}
