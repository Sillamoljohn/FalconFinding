import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) { }

   // get planents list
   getPlanetLists() {
    return this.httpService.get(`planets`);
  }

  // get vehicles list
  getVehiclesList() {
    return this.httpService.get(`vehicles`);
  }
  // get the token
  getToken = (data) => {
    return this.httpService.post(`token`, data);
  }
  // sending all the data for finding the falcon
  findFalcon = (data) => {
    return this.httpService.post(`find`, data);
  }
}
