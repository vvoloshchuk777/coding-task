import Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const vaccineSummaryQuerySchema = Joi.object({
  c: Joi.string(),
  dateFrom: Joi.string().pattern(/^\d{4}(-W)\d{2}$/),
  dateTo: Joi.string().pattern(/^\d{4}(-W)\d{2}$/),
  range: Joi.number(),
});

export interface vaccineSummaryRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    c: string;
    dateFrom: string;
    dateTo: string;
    range: string;
  };
}
