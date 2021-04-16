import { IResult } from './state/model/api-response';

export const parseApiResponse = (result: IResult): IResult => {
  const data = result.data;
  const error = result.error;
  return { data, error };
};
