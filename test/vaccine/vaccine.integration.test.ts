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
    expect(request.body).toEqual({ summary: [] });
  });

  it.each([
    {
      name: 'full distance',
      c: 'AT',
      dateFrom: '2020-W13',
      dateTo: '2020-W35',
      range: 5,
      expected: [
        {
          NumberDosesReceived: 6,
          WeekEnd: '2020-W18',
          WeekStart: '2020-W13',
        },
        {
          NumberDosesReceived: 6,
          WeekEnd: '2020-W24',
          WeekStart: '2020-W19',
        },
        {
          NumberDosesReceived: 4,
          WeekEnd: '2020-W28',
          WeekStart: '2020-W25',
        },
      ],
    },
    {
      name: 'full distance with range 10',
      c: 'AT',
      dateFrom: '2020-W13',
      dateTo: '2020-W35',
      range: 10,
      expected: [
        {
          NumberDosesReceived: 11,
          WeekEnd: '2020-W23',
          WeekStart: '2020-W13',
        },
        {
          NumberDosesReceived: 5,
          WeekEnd: '2020-W28',
          WeekStart: '2020-W24',
        },
      ],
    },
    {
      name: 'w13 to w20 distance',
      c: 'AT',
      dateFrom: '2020-W13',
      dateTo: '2020-W20',
      range: 5,
      expected: [
        {
          NumberDosesReceived: 6,
          WeekEnd: '2020-W18',
          WeekStart: '2020-W13',
        },
        {
          NumberDosesReceived: 1,
          WeekEnd: '2020-W19',
          WeekStart: '2020-W19',
        },
      ],
    },
    {
      name: 'out of match',
      c: 'AT',
      dateFrom: '2020-W43',
      dateTo: '2020-W50',
      range: 5,
      expected: [],
    },
  ])('querying $name', async ({ name, expected, ...rest }) => {
    const queryString = Object.keys(rest)
      .map((key) => `${key}=${rest[key]}`)
      .join('&');
    const request = await makeRequest(app.testApp.app, `/vaccine-summary?${queryString}`).expect(StatusCodes.OK);
    expect(request).toBeDefined();
    expect(request.body).toEqual({ summary: expected });
  });
});
