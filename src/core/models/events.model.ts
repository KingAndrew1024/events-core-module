import { IEventsApiProps } from '../contracts/IEvents.repository';

export class EventModel implements IEventModelProps {
    id: number;
    title: string;
    description: string;
    place: string;
    datetimeFrom: string;
    datetimeTo: string;
    latitude?: string;
    longitude?: string;
    attendees: Array<{
        contactId?: number
        email?: string
        fullName: string
        initials: string
        lastName: string
        name: string
        phone?: string
    }>;

    constructor(data: IEventModelProps) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.place = data.place && data.place !== 'null' ? data.place : null;
        this.datetimeFrom = data.datetimeFrom;
        this.datetimeTo = data.datetimeTo !== '0000-00-00 00:00:00' ? data.datetimeTo : null;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.attendees = data.attendees;
    }

    static fromDataResponse(data: IEventsApiProps): EventModel {
        data.attendees = data.attendees || [];

        return new EventModel({
            id: +data.id,
            title: data.title,
            description: data.description,
            place: data.place,
            datetimeFrom: data.datetime_from,
            datetimeTo: data.datetime_to,
            latitude: data.latitude,
            longitude: data.longitude,
            attendees: data.attendees.map(a => {
                return {
                    contactId: +a.contact_id,
                    email: a.email,
                    fullName: a.full_name,
                    initials: a.initials,
                    lastName: a.last_name,
                    name: a.name,
                    phone: a.phone
                };
            }),
        });
    }

    static empty(): EventModel {
        return new EventModel({
            id: null,
            title: null,
            description: null,
            place: null,
            datetimeFrom: null,
            datetimeTo: null,
        });
    }

}

export interface IEventModelProps {
    id: number;
    title: string;
    description: string;
    place: string;
    datetimeFrom: string;
    datetimeTo: string;
    latitude?: string;
    longitude?: string;
    attendees?: Array<{
        contactId?: number
        email?: string
        fullName: string
        initials: string
        lastName: string
        name: string
        phone?: string
    }>;
}
