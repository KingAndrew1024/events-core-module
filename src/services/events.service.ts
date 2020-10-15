import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IEventsCommonProps, IEventsApiProps } from '../core/contracts/IEvents.repository';
import { EventsRepository } from '../repositories/events.repository';
import { IEventsService } from '../core/contracts/IEvents.service';
import { EventModel } from '../core/models/events.model';
import { IHttpBasicResponse } from '../core/contracts/IHttpBasicResponse';


@Injectable()
export class EventsService implements IEventsService<EventModel>{
    constructor(private repository: EventsRepository) { }

    getEvents(): Observable<EventModel[]> {
        return this.repository.getEvents().pipe(
            map((response) => {
                return response.data.map(m => EventModel.fromDataResponse(m))
                //Always sort ASC
                .sort((a, b) => a.datetimeFrom.localeCompare(b.datetimeFrom))
            }),
            catchError(error => {
                throw error
            })
        );
    }

    createEvent(payload: IEventsCommonProps): Observable<EventModel> {
        return this.repository.createEvent(payload).pipe(
            map((response: IHttpBasicResponse<IEventsApiProps>) => {

                return new EventModel({
                    id: +response.data.id,
                    title: response.data.title,
                    place: response.data.place,
                    description: response.data.description,
                    datetimeFrom: response.data.datetime_from,
                    datetimeTo: response.data.datetime_to,
                    attendees: response.data.attendees.map(a => { 
                        return { 
                            contactId: +a.contact_id,
                            email: a.email,
                            fullName: a.full_name,
                            initials: a.initials,
                            lastName: a.last_name,
                            name: a.name,
                            phone: a.phone 
                        } 
                    }),
                })
            }),
            catchError(error => {
                console.error("ERROR", error);
                throw error
            })
        );
    }

    updateEvent(id: number, payload: IEventsCommonProps): Observable<EventModel> {
        return this.repository.updateEvent(id, payload).pipe(
            map((response: IHttpBasicResponse<IEventsApiProps>) => {

                return new EventModel({
                    id: +response.data.id,
                    title: response.data.title,
                    place: response.data.place,
                    description: response.data.description,
                    datetimeFrom: response.data.datetime_from,
                    datetimeTo: response.data.datetime_to,
                    attendees: response.data.attendees.map(a => {
                        return { 
                            contactId: +a.contact_id,
                            email: a.email,
                            fullName: a.full_name,
                            initials: a.initials,
                            lastName: a.last_name,
                            name: a.name,
                            phone: a.phone 
                        }
                    }),
                })
            }),
            catchError(error => {
                throw error
            })
        );
    }

    deleteEvent(payload: number): Observable<boolean> {
        return this.repository.deleteEvent(payload).pipe(
            map((response) => {
                return true
            }),
            catchError(error => {
                throw error
            })
        );
    }
}