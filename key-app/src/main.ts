import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => console.log('Angular démarré ✅'))
  .catch(err => console.error('Erreur bootstrap Angular ❌', err));

