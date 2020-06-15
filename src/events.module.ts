import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { eventsReducer } from './store/events.reducer';
import { EventsEffects } from './store/events.effects';
import { EventsModuleOptionsInterface, AppSettingsService } from './providers/global-params';
import { EVENTS_SERVICE } from './services/identifiers';
import { EventsService } from './services/events.service';
import { EventsRepository } from './repositories/events.repository';
import { EventsStore } from './services/state/events.store';


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
  providers:[
    
  ],
  declarations: [
    // declare all components that your module uses
    //MyComponent
  ],
  exports: [
    // export the component(s) that you want others to be able to use
    //MyComponent
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
        EventsRepository,
        EventsStore
      ]
    };
  }
}

