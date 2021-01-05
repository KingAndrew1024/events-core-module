import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, EventsEffects } from './events.effects';
import { EventModel, IEventsService } from '../core';
import { TestBed } from '@angular/core/testing';
import { EventsStore } from '../services/state/events.store';
import { EVENTS_SERVICE } from '../services';
import { EventsActionTypes } from './events.actions';

class MockEventsService {
    getEvents() { }

    createEvent() { }

    updateEvent() { }

    deleteEvent() {}
}

describe('EventsEffects', () => {
    let actions$ = new Observable<Action>();
    let effects: EventsEffects;
    let store: MockStore<AppState>;
    let eventsService: IEventsService<EventModel>;

    const initialState = { events: {} };

    const errorString = 'some bad error';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                EventsStore,
                EventsEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: EVENTS_SERVICE, useClass: MockEventsService }
            ]
        });

        effects = TestBed.inject(EventsEffects);
        store = TestBed.inject(MockStore);
        eventsService = TestBed.inject(EVENTS_SERVICE);
    });

    it('Should be created', () => {
        expect(effects).toBeTruthy('EventsEffects not created');
    });

    it('load$ Should return a GetEventSuccess action with the Event List on success', (done: DoneFn) => {
        const fakeEventModelList: Array<any> = [{}, {}, {}];

        const spy = spyOn(eventsService, 'getEvents').and.returnValue(of(fakeEventModelList));

        actions$ = of({ type: EventsActionTypes.GetEventsBegin });

        effects.load$.subscribe(response => {
            expect(response.type).toEqual(EventsActionTypes.GetEventsSuccess);
            expect((response as any).events.length).toEqual(fakeEventModelList.length);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('load$ Should return a GetEventFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(eventsService, 'getEvents').and.returnValue(throwError(errorString));

        actions$ = of({ type: EventsActionTypes.GetEventsBegin });

        effects.load$.subscribe(response => {
            expect(response.type).toEqual(EventsActionTypes.GetEventsFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toBe(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('create$ Should return a CreateEventSuccess action with the Event on success', (done: DoneFn) => {
        const fakeEventModel: any = {};

        const spy = spyOn(eventsService, 'createEvent').and.returnValue(of(fakeEventModel));

        actions$ = of({ type: EventsActionTypes.CreateEventBegin });

        effects.create$.subscribe(response => {
            expect(response.type).toEqual(EventsActionTypes.CreateEventSuccess);
            expect((response as any).event).toBeDefined();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('create$ Should return a CreateEventFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(eventsService, 'createEvent').and.returnValue(throwError(errorString));

        actions$ = of({ type: EventsActionTypes.CreateEventBegin });

        effects.create$.subscribe(response => {
            expect(response.type).toEqual(EventsActionTypes.CreateEventFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toBe(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('update$ Should return a UpdateEventSuccess action with the Event on success', (done: DoneFn) => {
        const fakeEventModel: any = {};

        const spy = spyOn(eventsService, 'updateEvent').and.returnValue(of(fakeEventModel));

        actions$ = of({ type: EventsActionTypes.UpdateEventBegin });

        effects.update$.subscribe(response => {
            expect(response.type).toEqual(EventsActionTypes.UpdateEventSuccess);
            expect((response as any).event).toBeDefined();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('update$ Should return a UpdateEventFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(eventsService, 'updateEvent').and.returnValue(throwError(errorString));

        actions$ = of({ type: EventsActionTypes.UpdateEventBegin });

        effects.update$.subscribe(response => {
            expect(response.type).toEqual(EventsActionTypes.UpdateEventFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toBe(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('delete$ Should return a DeleteEventSuccess action with true as response', (done: DoneFn) => {
        const eventId = 123;

        const spy = spyOn(eventsService, 'deleteEvent').and.returnValue(of(true));

        actions$ = of({ type: EventsActionTypes.DeleteEventBegin, eventId });

        effects.delete$.subscribe(response => {
            expect(response.type).toEqual(EventsActionTypes.DeleteEventSuccess);
            expect((response as any).eventId).toEqual(eventId);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('delete$ Should return a DeleteEventFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(eventsService, 'deleteEvent').and.returnValue(of(false));

        actions$ = of({ type: EventsActionTypes.DeleteEventBegin });

        effects.delete$.subscribe(response => {
            expect(response.type).toEqual(EventsActionTypes.DeleteEventFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toBe('Error desconocido');
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('delete$ Should return a DeleteEventFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(eventsService, 'deleteEvent').and.returnValue(throwError(errorString));

        actions$ = of({ type: EventsActionTypes.DeleteEventBegin });

        effects.delete$.subscribe(response => {
            expect(response.type).toEqual(EventsActionTypes.DeleteEventFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toBe(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
});
