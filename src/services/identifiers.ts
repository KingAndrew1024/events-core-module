import { InjectionToken } from '@angular/core';
import { IEventsService } from '../core/contracts/IEvents.service';
import { EventModel } from '../core/models/events.model';

export const EVENTS_SERVICE = new InjectionToken<IEventsService<EventModel>>('eventsService');
