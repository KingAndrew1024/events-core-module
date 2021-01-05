import { IEventsRepository } from '../core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppSettingsService } from '../providers/global-params';
import { TEST_EVENTS_API_LIST, TEST_EVENTS_FORM_MODEL } from '../mocks/events.data';
import { EventsRepository } from './events.repository';
import { EVENTS_REPOSITORY } from '../services/identifiers';

describe('EventsRepository', () => {
    let eventsRepository: IEventsRepository;
    let httpTestingController: HttpTestingController;

    const okStatusText = 'success';
    const errorStatusText = 'some bad error';
    const errorStatusCode = 500;

    beforeEach(() => {
        const fakeAppSettingsService = {
            getApiUrl: () => 'any_string',
            getInstanceName: () => 'any_string'
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: AppSettingsService, useValue: fakeAppSettingsService },
                { provide: EVENTS_REPOSITORY, useClass: EventsRepository }
            ]
        });

        eventsRepository = TestBed.inject(EVENTS_REPOSITORY);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('Should call endpoint /schedule and retrieve a non empty list of events', () => {

        eventsRepository.getEvents()
            .subscribe(response => {

                expect(response.status).toBe(okStatusText);
                expect(response.data).toBeTruthy();
                expect(response.data.length).toBe(TEST_EVENTS_API_LIST.length, 'Incorrect number of Events returned');
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/schedule'));

        expect(req.request.method).toBe('GET');

        req.flush({ data: TEST_EVENTS_API_LIST, status: okStatusText });
    });

    it('Should call endpoint /schedule and throw an HttpErrorResponse', () => {

        eventsRepository.getEvents()
            .subscribe(() => { }, error => {
                expect(error.status).toBe(errorStatusCode);
                expect(error.statusText).toBe(errorStatusText);
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/schedule'));

        expect(req.request.method).toBe('GET');

        req.flush(null, { status: errorStatusCode, statusText: errorStatusText });
    });

    it('Should call endpoint /schedule/create and retrieve an event', () => {
        const payload = TEST_EVENTS_FORM_MODEL;

        eventsRepository.createEvent(payload as any)
            .subscribe(response => {
                expect(response.status).toBe(okStatusText);
                expect(response.data).toBeTruthy();
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/schedule/create'));

        expect(req.request.method).toBe('POST');

        req.flush({ data: TEST_EVENTS_API_LIST[0], status: okStatusText });
    });

    it('Should call endpoint /schedule/create and throw an HttpErrorResponse', () => {

        eventsRepository.createEvent(null)
            .subscribe(() => { }, error => {
                expect(error.status).toBe(errorStatusCode);
                expect(error.statusText).toBe(errorStatusText);
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/schedule/create'));

        expect(req.request.method).toBe('POST');

        req.flush(null, { status: errorStatusCode, statusText: errorStatusText });
    });

    it('Should call endpoint /schedule/update/{id} and retrieve an event', () => {
        const eventId = 123;
        const payload = TEST_EVENTS_FORM_MODEL;

        eventsRepository.updateEvent(eventId, payload as any)
            .subscribe(response => {
                expect(response.status).toBe(okStatusText);
                expect(response.data).toBeTruthy();
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/schedule/update/' + eventId));

        expect(req.request.method).toBe('POST');

        req.flush({ data: TEST_EVENTS_API_LIST[0], status: okStatusText });
    });

    it('Should call endpoint /schedule/update/{id} and throw an HttpErrorResponse', () => {
        const eventId = 123;

        eventsRepository.updateEvent(eventId, null)
            .subscribe(() => { }, error => {
                expect(error.status).toBe(errorStatusCode);
                expect(error.statusText).toBe(errorStatusText);
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/schedule/update/' + eventId));

        expect(req.request.method).toBe('POST');

        req.flush(null, { status: errorStatusCode, statusText: errorStatusText });
    });

    it('Should call endpoint /schedule/delete/{id} and delete an event', () => {
        const eventId = 123;
        const payload = TEST_EVENTS_FORM_MODEL;

        eventsRepository.deleteEvent(eventId)
            .subscribe(response => {
                expect(response.status).toBe(okStatusText);
                expect(response.data).toBe(null);
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/schedule/delete/' + eventId));

        expect(req.request.method).toBe('DELETE');

        req.flush({ data: null, status: okStatusText });
    });

    it('Should call endpoint /schedule/delete/{id} and throw an HttpErrorResponse', () => {
        const eventId = 123;

        eventsRepository.deleteEvent(eventId)
            .subscribe(() => { }, error => {
                expect(error.status).toBe(errorStatusCode);
                expect(error.statusText).toBe(errorStatusText);
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/schedule/delete/' + eventId));

        expect(req.request.method).toBe('DELETE');

        req.flush(null, { status: errorStatusCode, statusText: errorStatusText });
    });
});
