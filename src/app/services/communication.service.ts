import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  server_url = 'http://localhost:8080/engine-rest/process-definition/key/recurtement_process/start';
  constructor(
    private http: HttpClient
  ) { }
  start(user: User) {
    const params = JSON.stringify({
    'variables' : {
      'name': user.name,
      'lastname': user.lastname,
      'email': user.email,
      'cin': user.cin,
      'adress': user.adress,
      'phone': user.phone,
      'specialty': user.specialty,
      'department': user.department,
      'grade': user.grade
    }
    });
    const httpHeadres = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Cache-Control' : 'no-cache'
      }
    );
    const options = {
      headers: httpHeadres
    };
    return this.http.post(this.server_url, params.toString() , options);
  }}
