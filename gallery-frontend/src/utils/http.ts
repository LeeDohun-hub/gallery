type HttpLikeResponse<T = unknown> = {
  status?: number;
  data?: T;
};

export function getStatus(response: unknown): number | undefined {
  return (response as HttpLikeResponse | undefined)?.status;
}

export function getData<T>(response: unknown): T | undefined {
  return (response as HttpLikeResponse<T> | undefined)?.data;
}
