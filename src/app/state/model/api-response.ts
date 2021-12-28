export interface result {
  data: any;
  error: error;
}

export interface error {
  errorCode: string;
  errorMessage: string;
}
