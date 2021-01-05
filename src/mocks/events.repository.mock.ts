import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEventsApiProps, IEventsCommonProps, IEventsRepository } from '../core/contracts/IEvents.repository';
import { IHttpBasicResponse } from '../core/contracts/IHttpBasicResponse';
import { TEST_EVENTS_API_LIST } from './events.data';

@Injectable()
export class MockEventsRepository implements IEventsRepository {

    constructor() { }

    readonly responseError: IHttpBasicResponse<null> = {
        status: 'error',
        message: 'Some bad error!',
        statusCode: 500
    };

    getEvents(): Observable<IHttpBasicResponse<IEventsApiProps[]>> {
        const data: IEventsApiProps[] = TEST_EVENTS_API_LIST;

        const responseOk: IHttpBasicResponse<IEventsApiProps[]> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

    createEvent(payload: IEventsCommonProps): Observable<IHttpBasicResponse<IEventsApiProps>> {
        const data: IEventsApiProps = TEST_EVENTS_API_LIST[0];

        const responseOk: IHttpBasicResponse<IEventsApiProps> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

    updateEvent(id: number, payload: IEventsCommonProps): Observable<IHttpBasicResponse<IEventsApiProps>> {
        const data: IEventsApiProps = TEST_EVENTS_API_LIST[0];

        const responseOk: IHttpBasicResponse<IEventsApiProps> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

    deleteEvent(id: any): Observable<IHttpBasicResponse<null>> {
        const data = null;

        const responseOk: IHttpBasicResponse<null> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }
}
