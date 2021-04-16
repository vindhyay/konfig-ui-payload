export interface IResult {
  data: any;
  error: error;
}

export interface error {
  errorCode: string;
  errorMessage: string;
}
