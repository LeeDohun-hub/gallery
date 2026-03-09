import axios from 'axios';

// 액세스 토큰 (인터셉터/일반 함수에서 React 훅을 쓸 수 없어 모듈 변수로 보관)
let _accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  _accessToken = token;
}

export function getAccessToken(): string | null {
  return _accessToken;
}

const instance = axios.create();

instance.interceptors.response.use(
  (res) => res,
  async (err: { response?: { status?: number }; config?: Record<string, unknown> }) => {
    const status = err.response?.status;

    switch (status) {
      case 400:
        window.alert('잘못된 요청입니다.');
        break;

      case 401: {
        const config = err.config as Record<string, unknown> | undefined;
        if (!config) {
          return Promise.reject(err);
        }

        if ((config as { retried?: boolean }).retried) {
          window.alert('권한이 없습니다.');
          window.location.replace('/');
          return Promise.reject(err);
        }

        try {
          const res = await axios.get<string>('/v1/api/account/token');
          const accessToken = res.data;
          _accessToken = accessToken;

          const headers = (config.headers as Record<string, string>) ?? {};
          headers.authorization = `Bearer ${accessToken}`;
          config.headers = headers;
          (config as { retried?: boolean }).retried = true;

          return instance(config);
        } catch {
          window.alert('권한이 없습니다.');
          window.location.replace('/');
        }
        break;
      }

      case 500:
        window.alert('오류가 있습니다. 관리자에게 문의해주세요.');
        break;
    }

    return Promise.reject(err);
  }
);

function generateConfig(): { headers?: { authorization: string } } {
  if (_accessToken) {
    return { headers: { authorization: `Bearer ${_accessToken}` } };
  }
  return {};
}

export default {
  get(url: string, params?: Record<string, unknown>) {
    return instance.get(url, { ...generateConfig(), params });
  },
  post(url: string, params?: Record<string, unknown>) {
    return instance.post(url, params, generateConfig());
  },
  put(url: string, params?: Record<string, unknown>) {
    return instance.put(url, params, generateConfig());
  },
  delete(url: string) {
    return instance.delete(url, generateConfig());
  },
};
