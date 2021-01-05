import { EventsStore } from './events.store';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import * as fromSelector from '../../store/events.selectors';
import * as fromActions from '../../store/events.actions';
import { of } from 'rxjs/internal/observable/of';

describe('EventsStore', () => {
    let store: any;
    let eventsStore: EventsStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Store,
                    useValue: { select: of(true), dispatch: (val) => { } }
                },
                EventsStore
            ]
        });

        store = TestBed.inject(Store);
        eventsStore = TestBed.inject(EventsStore);

        spyOn(store, 'select').and.returnValue(of(true /* any value, we are not testing this result */));
        spyOn(store, 'dispatch').and.callThrough();
    });

    it('Should be created', () => {
        expect(eventsStore).toBeTruthy('eventsStore not created');
    });

    it('Loading$ shoud call select once with parameter fromSelector.getIsLoading', (done: DoneFn) => {
        eventsStore.Loading$.subscribe(resp => {
            expect(eventsStore.store.select).toHaveBeenCalledTimes(1);
            expect(eventsStore.store.select as any).toHaveBeenCalledWith(fromSelector.getIsLoading);
            done();
        });
    });

    it('Error$ shoud call select once with parameter fromSelector.getError', (done: DoneFn) => {
        eventsStore.Error$.subscribe(_ => {
            expect(eventsStore.store.select).toHaveBeenCalledTimes(1);
            expect(eventsStore.store.select as any).toHaveBeenCalledWith(fromSelector.getError);
            done();
        });
    });

    it('Success$ shoud call select once with parameter fromSelector.getSuccess', (done: DoneFn) => {
        eventsStore.Success$.subscribe(_ => {
            expect(eventsStore.store.select).toHaveBeenCalledTimes(1);
            expect(eventsStore.store.select as any).toHaveBeenCalledWith(fromSelector.getSuccess);
            done();
        });
    });

    it('Calendar$ should call select once with parameter fromSelector.getEvents', (done: DoneFn) => {
        eventsStore.Calendar$.subscribe(_ => {
            expect(eventsStore.store.select).toHaveBeenCalledTimes(1);
            expect(eventsStore.store.select as any).toHaveBeenCalledWith(fromSelector.getEvents);
            done();
        });
    });

    it('EventById$ should call dispatch once with parameter fromActions.SelectEventAction({ eventId: id }) and call select once with parameter fromSelector.getEventById', (done: DoneFn) => {
        const id = 123;

        eventsStore.EventById$(id).subscribe(_ => {
            expect(eventsStore.store.dispatch).toHaveBeenCalledTimes(1);
            expect(eventsStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.SelectEventAction({ eventId: id }));

            expect(eventsStore.store.select).toHaveBeenCalledTimes(1);
            expect(eventsStore.store.select as any).toHaveBeenCalledWith(fromSelector.getEventById);

            done();
        });
    });

    it('selectedEvent$() should call select once with parameter fromSelector.getSelectedEventId', (done: DoneFn) => {
        eventsStore.selectedEvent$().subscribe(_ => {
            expect(eventsStore.store.select).toHaveBeenCalledTimes(1);
            expect(eventsStore.store.select as any).toHaveBeenCalledWith(fromSelector.getSelectedEventId);

            done();
        });
    });

    it('getEvents should call dispatch once with parameter fromActions.GetEventsBeginAction()', (done: DoneFn) => {
        eventsStore.getEvents();
        expect(eventsStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(eventsStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.GetEventsBeginAction());

        done();
    });

    it('createEvent should call dispatch once with parameter fromActions.CreateEventBeginAction({ payload })', (done: DoneFn) => {
        const payload: any = {};

        eventsStore.createEvent(payload);
        expect(eventsStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(eventsStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.CreateEventBeginAction({ payload }));

        done();
    });

    it('updateEvent should call dispatch once with parameter fromActions.CreateEventBeginAction({ id, payload })', (done: DoneFn) => {
        const id = 123;
        const payload: any = {};

        eventsStore.updateEvent(id, payload);
        expect(eventsStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(eventsStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.UpdateEventBeginAction({ id, payload }));

        done();
    });

    it('deleteEvent should call dispatch once with parameter fromActions.DeleteEventBeginAction({ eventId})', (done: DoneFn) => {
        const eventId = 123;

        eventsStore.deleteEvent(eventId);
        expect(eventsStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(eventsStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.DeleteEventBeginAction({ eventId }));

        done();
    });
});
