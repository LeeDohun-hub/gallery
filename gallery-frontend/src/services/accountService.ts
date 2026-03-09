import httpRequester from '../libs/httpRequester.ts';

// 회원가입
export const join = (args: Record<string, unknown>) => {
  return httpRequester.post('/v1/api/account/join', args).catch((e: { response?: unknown }) => e.response);
};

// 로그인
export const login = (args: Record<string, unknown>) => {
  return httpRequester.post('/v1/api/account/login', args).catch((e: { response?: unknown }) => e.response);
};

// 로그인 여부 확인
export const check = () => {
  return httpRequester.get('/v1/api/account/check').catch((e: { response?: unknown }) => e.response);
};

// 로그아웃
export const logout = () => {
  return httpRequester.post('/v1/api/account/logout', {}).catch((e: { response?: unknown }) => e.response);
};

