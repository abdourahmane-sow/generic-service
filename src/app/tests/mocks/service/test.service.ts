import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { IMember } from '../interface/IMember';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TestService extends BaseService<IMember,number> {

constructor(http: HttpClient) {
  super(http,`${environment.api.baseUrl}/members`);
}

}
