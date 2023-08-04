import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ACCESS_TOKEN, LoginDto } from "../dto/login.dto";

@Injectable()
export class LoginService {

    constructor(
        private _http: HttpClient
    ){}

    public login(body: LoginDto): Observable<ACCESS_TOKEN>{
        return this._http.post<ACCESS_TOKEN>(environment.server + environment.login, body)
    }

}