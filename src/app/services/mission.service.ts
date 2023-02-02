import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMission} from "../interfaces/imission";
import {Mission} from "../enums/mission";

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private url: string = "http://localhost:8080/";
  private endpoint: string = "missions";

  constructor(private http: HttpClient) { }

  public getMissions(): Observable<IMission[]> {
    return this.http.get<IMission[]>(this.url+this.endpoint);
  }

  public getMission(id: string): Observable<IMission> {
    return this.http.get<IMission>(this.url+this.endpoint+id);
  }

  public saveMission(mission: IMission): Observable<IMission|any> {
    console.log("données passé au service mission : " + mission.nom);
    return this.http.post<any>(this.url+this.endpoint, mission);
  }

  public updateMission(id: string, mission: IMission): Observable<IMission|any> {
    return this.http.post<any>(this.url+this.endpoint+id, mission);
  }

  public deleteMission(id: string): Observable<any> {
    return this.http.delete<any>(this.url+this.endpoint+"/missions/"+id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE'
      })
    });
  }

  public endMission(id: string, nbHeure: number): Observable<IMission> {
    return this.http.put<any>(this.url+this.endpoint+"/missions/"+id, {});
  }

}
