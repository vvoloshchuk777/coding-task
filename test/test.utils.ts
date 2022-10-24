import { App } from '../src/app';
import { TEST_DB_CONFIG } from '../src/config';
import { MongoRepository } from 'typeorm';
import { VaccineDataResponse } from '../src/modules/vaccine/types';
import fs from 'fs';
import request from 'supertest';
import express from 'express';

export interface TestApp {
  testApp: App;
}

export async function initTestApp(): Promise<TestApp> {
  const database = `test_${Math.round(Math.random() * 10000000)}`;
  const testApp = new App(Object.assign(TEST_DB_CONFIG, { database }));
  await testApp.appDataSource.dataSource.initialize();

  return {
    testApp,
  };
}

export const seed = async <T>(repository: MongoRepository<T>): Promise<void> => {
  const data: VaccineDataResponse = JSON.parse(fs.readFileSync('test/test-data.json', 'utf-8'));
  await repository.insertMany(data.records);
};

export const closeTestApp = async (app: TestApp): Promise<void> => {
  await app.testApp.appDataSource.dataSource.destroy();
};

export const makeRequest = (app: express.Application, url: string, params?: any): request.Test => {
  const rq = request(app).get(url);
  if (params) {
    rq.send(params);
  }
  return rq;
};
