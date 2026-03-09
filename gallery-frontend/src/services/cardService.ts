import httpRequester from '../libs/httpRequester.ts';

// 장바구니 목록 조회
export const getItems = () => {
  return httpRequester.get('/v1/api/cart/items').catch((e: { response?: unknown }) => e.response);
};

// 장바구니 상품 추가
export const addItem = (itemId: number) => {
  return httpRequester.post('/v1/api/carts', { itemId }).catch((e: { response?: unknown }) => e.response);
};

// 장바구니에서 상품 삭제
export const removeItem = (itemId: number) => {
  return httpRequester.delete(`/v1/api/cart/items/${itemId}`).catch((e: { response?: unknown }) => e.response);
};