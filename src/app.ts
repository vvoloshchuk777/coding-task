import express from 'express';
import { AppDataSource } from './app-data-source';
import { PORT } from './config';
import { DataSourceOptions } from 'typeorm';
import { VaccineController } from './modules/vaccine/vaccine.controller';

export class App {
  public app: express.Application;
  public appDataSource: AppDataSource;

  constructor(dataSourceOptions: DataSourceOptions) {
    // create express application
    this.app = express();

    // create application data source
    this.appDataSource = new AppDataSource(dataSourceOptions);

    // configure application
    this.config();

    // add routes
    this.routes();
  }

  public async bootstrap(): Promise<void> {
    await this.appDataSource.initializeDataSource();
    await this.app.listen(PORT);
    console.log(`⚡ [server]: running at port ${PORT}`);
  }

  private config(): void {
    express.json();
  }

  private routes(): void {
    this.app.use(new VaccineController(this.appDataSource).getRouter());
  }
}
