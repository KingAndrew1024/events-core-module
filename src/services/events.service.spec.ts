import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IEventsCommonProps, IEventsRepository } from '../core/contracts/IEvents.repository';
import { IEventsService } from '../core/contracts/IEvents.service';
import { EventModel } from '../core/models/events.model';
import { TEST_EVENTS_API_LIST } from '../mocks/events.data';
import { MockEventsRepository } from '../mocks/events.repository.mock';
import { EventsService } from './events.service';
import { EVENTS_REPOSITORY, EVENTS_SERVICE } from './identifiers';

describe('EventsService', () => {
    let eventsService: IEventsService<EventModel>;
    let eventsRepositorySpy: IEventsRepository;
    let eventsRepositoryMock: IEventsRepository;

    beforeEach(() => {
        eventsRepositorySpy = jasmine.createSpyObj('EventsRepository', ['getEvents', 'createEvent', 'updateEvent', 'deleteEvent']);

        TestBed.configureTestingModule({
            providers: [
                { provide: EVENTS_REPOSITORY, useClass: MockEventsRepository },
                { provide: EVENTS_SERVICE, useClass: EventsService }
            ]
        });

        eventsRepositoryMock = TestBed.inject(EVENTS_REPOSITORY);
        eventsService = TestBed.inject(EVENTS_SERVICE);
    });

    it('Should be created', () => {
        expect(eventsService).toBeTruthy();
    });

    it('Should get a non-empty list of Events', (done: DoneFn) => {

        eventsService.getEvents()
            .subscribe(eventList => {

                expect(eventList).toBeDefined();
                expect(eventList[0] instanceof EventModel).toBeTruthy();
                expect(eventList.length).toBe(TEST_EVENTS_API_LIST.length);

                done();
            });
    });
    it('Should get an empty list of Events', (done: DoneFn) => {
        spyOn(eventsRepositoryMock, 'getEvents').and.returnValue(of({
            data: [],
            status: 'success'
        }));

        eventsService.getEvents()
            .subscribe(eventList => {
                expect(eventList).toBeDefined();
                expect(eventList.length).toBe(0);

                done();
            });
    });
    it('Should fail to get Events', (done: DoneFn) => {
        spyOn(eventsRepositoryMock, 'getEvents').and.returnValue(throwError('some bad error'));

        eventsService.getEvents()
            .subscribe(() => {}, error => {
                expect(error).toBeDefined();
                done();
            });
    });

    it('Should create an Event', (done: DoneFn) => {
        const fakePayload: IEventsCommonProps = {
            attendees: [],
            datetime_from: null,
            datetime_to: null,
            description: null,
            latitude: null,
            longitude: null,
            place: null,
            title: null
        };

        eventsService.createEvent(fakePayload)
            .subscribe(event => {

                expect(event instanceof EventModel).toBeTruthy();
                expect(event.id).toBe(+TEST_EVENTS_API_LIST[0].id);
                expect(event.datetimeFrom).toEqual(TEST_EVENTS_API_LIST[0].datetime_from);
                expect(event.datetimeTo).toEqual(TEST_EVENTS_API_LIST[0].datetime_to);

                done();
            });
    });
    it('Should fail to create an Event', (done: DoneFn) => {
        spyOn(eventsRepositoryMock, 'createEvent').and.returnValue(throwError('some bad error'));

        const fakePayload: IEventsCommonProps = {
            attendees: [],
            datetime_from: null,
            datetime_to: null,
            description: null,
            latitude: null,
            longitude: null,
            place: null,
            title: null
        };

        eventsService.createEvent(fakePayload)
            .subscribe(() => {}, error => {
                expect(error).toBeDefined();
                done();
            });
    });

    it('Should update an Event', (done: DoneFn) => {
        const fakePayload: IEventsCommonProps = {
            attendees: [],
            datetime_from: null,
            datetime_to: null,
            description: null,
            latitude: null,
            longitude: null,
            place: null,
            title: null
        };

        eventsService.updateEvent(123, fakePayload)
            .subscribe(event => {

                expect(event instanceof EventModel).toBeTruthy();
                expect(event.id).toBe(+TEST_EVENTS_API_LIST[0].id);
                expect(event.datetimeFrom).toEqual(TEST_EVENTS_API_LIST[0].datetime_from);
                expect(event.datetimeTo).toEqual(TEST_EVENTS_API_LIST[0].datetime_to);

                done();
            });
    });
    it('Should fail to update an Event', (done: DoneFn) => {
        spyOn(eventsRepositoryMock, 'updateEvent').and.returnValue(throwError('some bad error'));

        const fakePayload: IEventsCommonProps = {
            attendees: [],
            datetime_from: null,
            datetime_to: null,
            description: null,
            latitude: null,
            longitude: null,
            place: null,
            title: null
        };

        eventsService.updateEvent(123, fakePayload)
            .subscribe(() => {}, error => {
                expect(error).toBeDefined();
                done();
            });
    });

    it('Should delete an Event', (done: DoneFn) => {

        eventsService.deleteEvent(123)
            .subscribe(deleted => {
                expect(deleted).toBeTruthy();
                done();
            });
    });
    it('Should fail to delete an Event', (done: DoneFn) => {
        spyOn(eventsRepositoryMock, 'deleteEvent').and.returnValue(throwError('some bad error'));

        eventsService.deleteEvent(123)
            .subscribe(() => {}, error => {
                expect(error).toBeDefined();
                done();
            });
    });
});
