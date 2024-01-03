// Polyfill for requestAnimationFrame
global['requestAnimationFrame'] = (callback) => {
    return setTimeout(callback, 0);
};

// Now, the rest of your imports and code
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
