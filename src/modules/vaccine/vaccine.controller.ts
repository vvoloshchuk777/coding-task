import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createValidator, ExpressJoiInstance } from 'express-joi-validation';
import { VaccineService } from './vaccine.service';
import { AppDataSource } from '../../app-data-source';
import { VaccineDataResponse, VaccineSummaryRequest } from './types';
import { vaccineSummaryQuerySchema } from '../../common/validators/query.schema';
import fs from 'fs';

export class VaccineController {
  private readonly vaccineService: VaccineService;
  private readonly router: Router;
  private validator: ExpressJoiInstance;

  constructor(appDataSource: AppDataSource) {
    this.router = Router();
    this.validator = createValidator();
    this.vaccineService = new VaccineService(appDataSource);
    this.router.get('/vaccine-summary', this.validator.query(vaccineSummaryQuerySchema), async (request: VaccineSummaryRequest, response: Response) => this.getVaccines(request, response));
    this.router.post('/vaccine-seed', async (request: Request, response: Response) => this.seedData(request, response));
    console.info('VaccineController initialized');
  }

  getRouter(): Router {
    return this.router;
  }

  async getVaccines(request: VaccineSummaryRequest, response: Response): Promise<void> {
    const { c, dateFrom, dateTo, range } = request.query;
    const data = await this.vaccineService.queryVaccines({
      region: c,
      dateFrom,
      dateTo,
      range: range ? +range : undefined,
    });
    response.status(StatusCodes.OK).json({
      summary: data,
    });
  }

  async seedData(request: Request, response: Response): Promise<void> {
    const data: VaccineDataResponse = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    const count = await this.vaccineService.insertData(data.records);
    response.status(StatusCodes.OK).json({
      inserted: count,
    });
  }
}
