import { MongoRepository } from 'typeorm';
import { AppDataSource } from '../../app-data-source';
import { DBResponse, QueryParams, VaccineEntityPayload } from './types';
import { Vaccine } from '../../entities/vaccine.entity';
import { buildParams, buildPipeline } from '../../utils';

export class VaccineService {
  private readonly vaccineRepository: MongoRepository<Vaccine>;

  constructor(appDataSource: AppDataSource) {
    this.vaccineRepository = appDataSource.dataSource.getMongoRepository(Vaccine);
  }

  async queryVaccines(params: QueryParams): Promise<DBResponse[]> {
    const { range, dateFrom, dateTo, region } = params;
    const queryParams = buildParams({ range, dateFrom, dateTo });
    const pipeline = buildPipeline({ ...queryParams, region });

    return this.vaccineRepository
      .aggregate([
        {
          $set: {
            yearWeek: {
              $toInt: {
                $dateToString: {
                  date: { $dateFromString: { dateString: '$YearWeekISO', format: '%G-W%V' } },
                  format: '%G%V',
                },
              },
            },
          },
        },
        ...pipeline,
        { $sort: { NumberDosesReceived: -1 } },
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .toArray();
  }

  async seedData(data: VaccineEntityPayload[]): Promise<number> {
    await this.vaccineRepository.insertMany(data);
    return await this.vaccineRepository.count();
  }
}
