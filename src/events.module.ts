import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppSettingsService, EventsModuleOptionsInterface } from './providers/global-params';
import { EventsRepository } from './repositories/events.repository';
import { EventsService } from './services/events.service';
import { EVENTS_REPOSITORY, EVENTS_SERVICE } from './services/identifiers';
import { EventsStore } from './services/state/events.store';
import { EventsEffects } from './store/events.effects';
import { eventsReducer } from './store/events.reducer';

export const AppSettingsObject = new InjectionToken('AppSettingsObject');

export function createAppSettingsService(settings: EventsModuleOptionsInterface) {
    return new AppSettingsService(settings);
}

@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forFeature('events', eventsReducer),
        EffectsModule.forFeature([EventsEffects]),
    ],
    providers: [

    ],
    declarations: [
        // declare all components that your module uses
        // MyComponent
    ],
    exports: [
        // export the component(s) that you want others to be able to use
        // MyComponent
    ]
})
export class EventsCoreModule {
    static forRoot(config: EventsModuleOptionsInterface): ModuleWithProviders<EventsCoreModule> {
        return {
            ngModule: EventsCoreModule,
            providers: [
                { provide: AppSettingsObject, useValue: config },
                {
                    provide: AppSettingsService,
                    useFactory: (createAppSettingsService),
                    deps: [AppSettingsObject]
                },
                { provide: EVENTS_SERVICE, useClass: EventsService },
                { provide: EVENTS_REPOSITORY, useClass: EventsRepository },
                EventsStore
            ]
        };
    }
}

