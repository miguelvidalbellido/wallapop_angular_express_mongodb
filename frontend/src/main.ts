/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';



const bootstrapPromise =  platformBrowserDynamic().bootstrapModule(AppModule);

// Logging bootstrap information
bootstrapPromise.then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));
