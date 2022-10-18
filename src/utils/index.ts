import { BuildQueryResult, QueryParams } from '../modules/vaccine/types';

export const buildParams = (params: Omit<QueryParams, 'region'>): BuildQueryResult | null => {
  const { range, dateFrom, dateTo } = params;
  if (!Object.keys(params).length) return null;
  let from: number;
  let to: number;
  let boundaries: number[] = [];
  if (dateFrom) {
    from = Number(dateFrom.replace(/-W/, ''));
  }
  if (dateTo) to = Number(dateTo.replace(/-W/, ''));
  if (range) {
    boundaries = from ? [from] : [];
    do {
      boundaries.push(boundaries[boundaries.length - 1] + range + 1);
    } while (boundaries[boundaries.length - 1] < to);
  }
  return {
    from,
    to,
    boundaries,
  };
};

export const buildPipeline = (queryParams?: BuildQueryResult & { region: string }): object[] => {
  const pipeline = [];
  if (queryParams) {
    pipeline.push({
      $match: {
        $and: [
          { Region: queryParams.region },
          {
            yearWeek: {
              $gte: queryParams.from,
              $lt: queryParams.to,
            },
          },
        ],
      },
    });
    if (queryParams.boundaries.length) {
      pipeline.push({
        $bucket: {
          groupBy: '$yearWeek',
          boundaries: queryParams.boundaries,
          output: {
            NumberDosesReceived: { $sum: 1 },
            WeekStart: { $min: '$YearWeekISO' },
            WeekEnd: { $max: '$YearWeekISO' },
          },
        },
      });
    }
  }
  return pipeline;
};
