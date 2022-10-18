import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_CONFIG } from './config';

export class AppDataSource {
  public dataSource: DataSource;

  constructor(options: DataSourceOptions) {
    this.dataSource = new DataSource(options);
  }

  public async initializeDataSource(): Promise<void> {
    await this.dataSource.initialize();
    console.info('Data Source has been initialized!');
  }
}

export const ds = new DataSource(DB_CONFIG);
