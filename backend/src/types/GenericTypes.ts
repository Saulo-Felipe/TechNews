export interface DefaultResponse<T> {
  error?: string;
  success?: string;
  data?: T;
}
