import { Observable } from 'rxjs';
import { IEventsCommonProps } from './IEvents.repository';

export interface IEventsService<T1> {
    getEvents(): Observable<T1[]>;
    createEvent(payload: IEventsCommonProps): Observable<T1>;
    updateEvent(id: number, payload: any): Observable<T1>;
    deleteEvent(payload: number): Observable<boolean>;
}
