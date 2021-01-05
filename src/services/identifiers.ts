import { InjectionToken } from '@angular/core';
import { IEventsRepository } from '../core';
import { IEventsService } from '../core/contracts/IEvents.service';
import { EventModel } from '../core/models/events.model';

export const EVENTS_SERVICE = new InjectionToken<IEventsService<EventModel>>('eventsService');
export const EVENTS_REPOSITORY = new InjectionToken<IEventsRepository>('eventsRepository');
