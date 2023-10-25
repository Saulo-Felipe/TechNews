export interface DefaultResponse<DataType> {
  error?: string;
  success?: string;
  data?: DataType;
}
