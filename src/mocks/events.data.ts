import { IEventsApiProps } from '../core/contracts/IEvents.repository';

// for creating an event
export const TEST_EVENTS_FORM_MODEL = {
    id: 1,
    title: 'prueba uno',
    description: 'testing',
    place: 'Puebla, Mexico',
    datetime_from: '2020-12-24T13:00:00-06:00',
    datetime_to: '2020-12-24T14:00:00.000-06:00',
    latitude: null,
    longitude: null,
    attendees: [{ contact_id: 11 }, { contact_id: 9 }, { contact_id: 5 }, { contact_id: 3 }, { contact_id: 2 }],
};

export const TEST_EVENTS_FORM_MODEL_LIST = [{
    id: 123,
    title: 'Evento de prueba uno',
    description: 'testing',
    place: 'Puebla, Mexico',
    datetime_from: '2020-12-24T13:00:00-06:00',
    datetime_to: '2020-12-24T14:00:00.000-06:00',
    latitude: null,
    longitude: null,
    attendees: [{ contact_id: 11 }, { contact_id: 9 }, { contact_id: 5 }, { contact_id: 3 }, { contact_id: 2 }],
},
{
    id: 987,
    title: 'Evento de prueba dos',
    description: 'testing',
    place: 'Puebla, Mexico',
    datetime_from: '2020-12-24T13:00:00-06:00',
    datetime_to: '2020-12-24T14:00:00.000-06:00',
    latitude: null,
    longitude: null,
    attendees: [],
},
{
    id: 456,
    title: 'Evento de prueba tres',
    description: 'testing',
    place: 'Puebla, Mexico',
    datetime_from: '2020-12-24T13:00:00-06:00',
    datetime_to: '2020-12-24T14:00:00.000-06:00',
    latitude: null,
    longitude: null,
    attendees: [],
}];


export const TEST_EVENTS_API_LIST: Array<IEventsApiProps> = [{
    id: '16',
    client_id: '3',
    title: 'prueba uno',
    description: 'testing',
    place: 'Puebla, Mexico',
    datetime_from: '2020-12-24 13:00:00',
    datetime_to: '2020-12-24 14:00:00',
    latitude: '0.00000000',
    longitude: '0.00000000',
    attendees: [{
        contact_id: '2',
        full_name: 'Daniel Higgins',
        initials: 'DH',
        name: 'Daniel',
        last_name: 'Higgins',
        email: 'd-higgins@mac.com',
        phone: '5554787672'
    },
    {
        contact_id: '3',
        full_name: 'David Taylor',
        initials: 'DT',
        name: 'David',
        last_name: 'Taylor',
        email: '',
        phone: '5556106679'
    }, {
        contact_id: '5',
        full_name: 'John Appleseed',
        initials: 'JA',
        name: 'John',
        last_name: 'Appleseed',
        email: 'John-Appleseed@mac.com',
        phone: '8885555512'
    },
    {
        contact_id: '9',
        full_name: 'Daniel test',
        initials: 'Dt',
        name: 'Daniel',
        last_name: 'test',
        email: 'daniel@testemail.com',
        phone: '4567851235'
    }, {
        contact_id: '11',
        full_name: 'Pedro quinzanos',
        initials: 'Pq',
        name: 'Pedro',
        last_name: 'quinzanos',
        email: 'pquinzanos@gmail.com',
        phone: '5555555555'
    }]
},
{
    id: '17',
    client_id: '3',
    title: 'Evento dos',
    description: 'prueba eventos',
    place: 'null',
    datetime_from: '2020-12-25 15:00:00',
    datetime_to: '2020-12-25 23:00:00',
    latitude: '0.00000000',
    longitude: '0.00000000',
    attendees: []
},
{
    id: '18',
    client_id: '3',
    title: 'evento uno de enero',
    description: 'nada',
    place: 'Santa Fe, Mexico City, CDMX, Mexico',
    datetime_from: '2021-01-01 00:00:00',
    datetime_to: '2021-01-01 01:00:00',
    latitude: '0.00000000',
    longitude: '0.00000000',
    attendees: [{
        contact_id: '9',
        full_name: 'Daniel test',
        initials: 'Dt',
        name: 'Daniel',
        last_name: 'test',
        email: 'daniel@testemail.com',
        phone: '4567851235'
    },
    {
        contact_id: '11',
        full_name: 'Pedro quinzanos',
        initials: 'Pq',
        name: 'Pedro',
        last_name: 'quinzanos',
        email: 'pquinzanos@gmail.com',
        phone: '5555555555'
    }]
},
{
    id: '19',
    client_id: '3',
    title: 'evento febrero',
    description: '',
    place: 'null',
    datetime_from: '2021-02-02 00:00:00',
    datetime_to: '2021-02-02 01:00:00',
    latitude: '0.00000000',
    longitude: '0.00000000',
    attendees: []
},
{
    id: '20',
    client_id: '3',
    title: 'Dia de la primavera!!',
    description: 'Vengan con ropa de playa',
    place: 'Cuernavaca, Morelos, Mexico',
    datetime_from: '2021-03-21 00:00:00',
    datetime_to: '2021-03-21 01:00:00',
    latitude: '0.00000000',
    longitude: '0.00000000',
    attendees: [{
        contact_id: '2',
        full_name: 'Daniel Higgins',
        initials: 'DH',
        name: 'Daniel',
        last_name: 'Higgins',
        email: 'd-higgins@mac.com',
        phone: '5554787672'
    },
    {
        contact_id: '3',
        full_name: 'David Taylor',
        initials: 'DT',
        name: 'David',
        last_name: 'Taylor',
        email: '',
        phone: '5556106679'
    },
    {
        contact_id: '5',
        full_name: 'John Appleseed',
        initials: 'JA',
        name: 'John',
        last_name: 'Appleseed',
        email: 'John-Appleseed@mac.com',
        phone: '8885555512'
    }]
}];
