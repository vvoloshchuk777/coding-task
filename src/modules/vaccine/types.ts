import { ValidatedRequest } from 'express-joi-validation';
import { vaccineSummaryRequestSchema } from '../../common/validators/query.schema';

export type QueryParams = {
  region?: string;
  dateFrom?: string;
  dateTo?: string;
  range?: number;
};

export type BuildQueryResult = {
  from: number;
  to: number;
  boundaries: number[];
};

export type VaccineEntityPayload = {
  YearWeekISO: string;
  FirstDose: string;
  FirstDoseRefused: number;
  SecondDose: number;
  DoseAdditional1: number;
  DoseAdditional2: number;
  UnknownDose: number;
  NumberDosesReceived: number;
  NumberDosesExported: number;
  Region: string;
  Population: string;
  ReportingCountry: string;
  TargetGroup: string;
  Vaccine: string;
  Denominator: number;
};

export type VaccineDataResponse = {
  records: VaccineEntityPayload[];
};

export type VaccineSummaryRequest = ValidatedRequest<vaccineSummaryRequestSchema>;

export type DBResponse = {
  NumberDosesReceived: number;
  WeekStart: string;
  WeekEnd: string;
};
