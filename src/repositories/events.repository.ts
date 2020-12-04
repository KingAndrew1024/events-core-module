import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEventsApiProps, IEventsCommonProps, IEventsRepository } from '../core/contracts/IEvents.repository';
import { IHttpBasicResponse } from '../core/contracts/IHttpBasicResponse';
import { AppSettingsService } from '../providers/global-params';

@Injectable()
export class EventsRepository implements IEventsRepository {
    readonly BASE_URL = `${this.appSettings.getApiUrl()}/api/${this.appSettings.getInstanceName()}/v1`;

    constructor(
        private httpClient: HttpClient,
        private appSettings: AppSettingsService
    ) { }

    getEvents(): Observable<IHttpBasicResponse<IEventsApiProps[]>> {
        return this.httpClient.get<IHttpBasicResponse<IEventsApiProps[]>>(`${this.BASE_URL}/schedule`);
    }

    createEvent(payload: IEventsCommonProps): Observable<IHttpBasicResponse<IEventsApiProps>> {
        let params = new HttpParams();
        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                (typeof payload[key] === 'object') ?
                    params = params.append(key, JSON.stringify(payload[key]))
                    :
                    params = params.append(key, payload[key]);
            }
        }

        const body = params.toString();

        return this.httpClient.post<IHttpBasicResponse<IEventsApiProps>>(`${this.BASE_URL}/schedule/create`, body);
    }

    updateEvent(id: number, payload: IEventsCommonProps): Observable<IHttpBasicResponse<IEventsApiProps>> {
        let params = new HttpParams();
        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
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
        return this.httpClient.delete<IHttpBasicResponse<null>>(`${this.BASE_URL}/schedule/delete/${id}`);
    }
}
