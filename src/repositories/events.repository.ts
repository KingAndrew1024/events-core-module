import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettingsService } from '../providers/global-params';
import { IEventsRepository, IEventsApiProps, IEventsCommonProps } from '../core/contracts/IEvents.repository';
import { IHttpBasicResponse } from '../core/contracts/IHttpBasicResponse';

@Injectable()
export class EventsRepository implements IEventsRepository{
    readonly BASE_URL = `${this.appSettings.getApiUrl()}/api/${this.appSettings.getInstanceName()}/v1`;
    
    constructor(private httpClient: HttpClient,
        private appSettings: AppSettingsService){}
    
    getEvents(): Observable<IHttpBasicResponse<IEventsApiProps[]>> {
        //console.log("--- EXECUTING Calendarrepository.getEvents()");
        return this.httpClient.get<IHttpBasicResponse<IEventsApiProps[]>>(`${this.BASE_URL}/schedule`);
    }    
    
    createEvent(payload: IEventsCommonProps): Observable<IHttpBasicResponse<IEventsApiProps>> {
        //console.log("--- EXECUTING Calendarrepository.createEvent()");
        
        
        let params = new HttpParams();
        for (const key in payload) {
            if (payload.hasOwnProperty(key)){
                (typeof payload[key] === 'object') ?
                    params = params.append(key, JSON.stringify(payload[key]))
                :
                    params = params.append(key, payload[key]);
            }       
        }

        //console.log("--- CRATE MEETING PARAMS", params);

        const body = params.toString();

        //console.log("--- CRATE MEETING", body);
        //return null

        return this.httpClient.post<IHttpBasicResponse<IEventsApiProps>>(`${this.BASE_URL}/schedule/create`, body);
    }
    
    updateEvent(id: number, payload: IEventsCommonProps): Observable<IHttpBasicResponse<IEventsApiProps>> {
        //console.log("--- EXECUTING Calendarrepository.updateEvent()");
        let params = new HttpParams();
        for (const key in payload) {
            if (payload.hasOwnProperty(key)){
                (typeof payload[key] === 'object') ?
                    params = params.append(key, JSON.stringify(payload[key]))
                :
                    params = params.append(key, payload[key]);
            }
        }
        const body = params.toString();
        
        return this.httpClient.post<IHttpBasicResponse<IEventsApiProps>>(`${this.BASE_URL}/schedule/update/${id}`, body);
    }
    
    deleteEvent(id: any): Observable<IHttpBasicResponse<null>> {
        //console.log("--- EXECUTING Calendarrepository.deleteEvent()");
        return this.httpClient.delete<IHttpBasicResponse<null>>(`${this.BASE_URL}/schedule/delete/${id}`);
    }
}