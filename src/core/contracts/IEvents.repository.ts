import { Observable } from 'rxjs';

import { IHttpBasicResponse } from './IHttpBasicResponse';

export interface IEventsRepository {
    getEvents(): Observable<IHttpBasicResponse<IEventsApiProps[]>>;
    createEvent(payload: IEventsCommonProps): Observable<IHttpBasicResponse<IEventsApiProps>>;
    updateEvent(id: number, payload: IEventsCommonProps): Observable<IHttpBasicResponse<IEventsApiProps>>;
    deleteEvent(payload: number): Observable<IHttpBasicResponse<null>>;
}

export interface IEventsApiProps extends IEventsCommonProps{
    client_id: string
    id: string
}

export interface IEventsCommonProps{
    attendees: Array<{
        contact_id?: string
        email?: string
        full_name?: string
        initials: string
        last_name: string
        name: string
        phone?: string
    }>
    
    datetime_from: string
    datetime_to: string
    description: string
    
    latitude: string
    longitude: string
    place: string
    title: string
}

export interface IEventReminder{
    id: number
    text: string
    date: Date
}