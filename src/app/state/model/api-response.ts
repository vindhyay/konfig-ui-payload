export interface Result {
  data: any;
  error: Error;
}

export interface Error {
  errorCode: string;
  errorMessage: string;
}
