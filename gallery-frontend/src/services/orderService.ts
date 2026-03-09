import httpRequester from '../libs/httpRequester.ts';

// 주문 삽입
export const addOrder = (args: Record<string, unknown>) => {
  return httpRequester.post('/v1/api/orders', args).catch((e: { response?: unknown }) => e.response);
};

// 주문 목록 조회
export const getOrders = (args?: Record<string, unknown>) => {
  return httpRequester.get('/v1/api/orders', args).catch((e: { response?: unknown }) => e.response);
};

// 주문 상세 조회
export const getOrder = (id: string | number) => {
  return httpRequester.get(`/v1/api/orders/${id}`).catch((e: { response?: unknown }) => e.response);
};