import { DB_CONFIG } from './config';
import { App } from './app';

const app = new App(DB_CONFIG);
app.bootstrap();
