export interface Result<T> {
  value: T;
  isError: boolean;
  statusCode: number;
  message: string;
}
