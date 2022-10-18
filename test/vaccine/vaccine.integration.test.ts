import { MongoRepository } from 'typeorm';
import { closeTestApp, initTestApp, makeRequest, seed, TestApp } from '../test.utils';
import { Vaccine } from '../../src/entities/vaccine.entity';
import { StatusCodes } from 'http-status-codes';

describe('Vaccine', () => {
  let app: TestApp;
  let vaccineRepository: MongoRepository<Vaccine>;

  jest.setTimeout(60000);

  beforeAll(async () => {
    app = await initTestApp();
    vaccineRepository = app.testApp.appDataSource.dataSource.getMongoRepository(Vaccine);
    await seed(vaccineRepository);
  });

  afterAll(async () => {
    await closeTestApp(app);
  });

  it('no params', async () => {
    const request = await makeRequest(app.testApp.app, '/vaccine-summary').expect(StatusCodes.OK);
    expect(request).toBeDefined();
    expect(request.body).toEqual({ smmary: [] });
  });
});
