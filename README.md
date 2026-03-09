# Gallery Project

Spring Boot 백엔드와 React + TypeScript 프론트엔드로 만든 간단한 쇼핑형 갤러리 프로젝트입니다.

## 프로젝트 구성

- `gallery-backend`
  - Spring Boot API 서버
  - 회원가입 / 로그인 / 토큰 재발급
  - 상품 / 장바구니 / 주문 API
- `gallery-frontend`
  - React + TypeScript + Vite
  - 상품 목록 / 회원가입 / 로그인 / 장바구니 / 주문 / 주문 상세 화면

## 사용 기술

- Frontend
  - React
  - TypeScript
  - React Router
  - Axios
  - Vite
- Backend
  - Spring Boot
  - Spring Web
  - Spring Data JPA
  - MySQL / MariaDB driver
  - JWT (`jjwt`)

## 폴더 구조

```text
gallery/
├─ gallery-backend/
│  └─ src/main/java/com/example/gallery/
│     ├─ account/
│     ├─ cart/
│     ├─ item/
│     ├─ member/
│     ├─ order/
│     └─ common/
└─ gallery-frontend/
   └─ src/
      ├─ components/
      ├─ libs/
      ├─ pages/
      ├─ services/
      ├─ stores/
      ├─ types/
      └─ utils/
```

## 실행 방법

### 1. 백엔드 실행

Windows PowerShell 기준:

```powershell
cd .\gallery-backend
.\gradlew bootRun
```

기본 포트는 `8080`입니다.

### 2. 프론트엔드 실행

```powershell
cd .\gallery-frontend
npm install
npm run dev
```

기본 주소는 `http://localhost:5173`입니다.

## 이미지 경로 규칙

상품 이미지는 현재 프론트엔드의 `public/img` 폴더를 사용합니다.

- 실제 파일 위치 예시
  - `gallery-frontend/public/img/001.jpg`
- 상품 데이터의 `imgPath` 예시
  - `001.jpg`
  - `img/001.jpg`
  - `/img/001.jpg`

프론트의 `toImgSrc()` 유틸이 위 세 경우를 모두 `/img/...` 형태로 맞춰 처리합니다.

## 주요 화면 라우트

- `/`
  - 홈
- `/join`
  - 회원가입
- `/login`
  - 로그인
- `/cart`
  - 장바구니
- `/order`
  - 주문 폼
- `/orders`
  - 주문 목록
- `/orders/:id`
  - 주문 상세

## 주요 API

### Account

- `POST /v1/api/account/join`
- `POST /v1/api/account/login`
- `GET /v1/api/account/check`
- `POST /v1/api/account/logout`
- `GET /v1/api/account/token`

### Item

- `GET /v1/api/items`

### Cart

- `GET /v1/api/cart/items`
- `POST /v1/api/carts`
- `DELETE /v1/api/cart/items/{itemId}`

### Order

- `GET /v1/api/orders`
- `GET /v1/api/orders/{id}`
- `POST /v1/api/orders`

## 프론트엔드 흐름

### 1. 인증 상태 확인

- `App.tsx`에서 라우트 이동 시 `check()` 호출
- 로그인 여부를 `AccountProvider` 상태에 반영
- 확인이 끝난 뒤 레이아웃을 렌더링

### 2. HTTP 공통 처리

- `src/libs/httpRequester.ts`
  - 액세스 토큰 헤더 부착
  - `401` 발생 시 `/v1/api/account/token`으로 토큰 재발급 시도
  - `400`, `401`, `500` 공통 알림 처리

### 3. 화면별 데이터 처리

- `src/services/*`
  - API 호출 함수 모음
- `src/utils/http.ts`
  - 응답 객체에서 `status`, `data` 추출
- `src/utils/item.ts`
  - 상품 데이터 정규화
  - 할인 가격 계산
  - 이미지 경로 보정

## 이번에 정리한 리팩토링 포인트

- 반복되던 응답 형변환을 `utils/http.ts`로 공통화
- 상품 데이터 정규화와 가격/이미지 로직을 `utils/item.ts`로 분리
- 공용 타입을 `types/models.ts`로 분리
- `AccountStore`를 함수형 `setState` 기반으로 정리해서 stale state 위험 감소
- 카드 컴포넌트의 이미지/가격 처리 중복 제거
- 페이지별 유효성 검증 로직을 Vue 동작과 맞추되 React 방식으로 정리

## 공부 순서 추천

### 1. 전체 진입 흐름

아래 파일부터 보시면 프로젝트 흐름을 이해하기 쉽습니다.

1. `gallery-frontend/src/main.tsx`
2. `gallery-frontend/src/router.tsx`
3. `gallery-frontend/src/App.tsx`

### 2. 프론트 상태와 통신

1. `gallery-frontend/src/stores/account.tsx`
2. `gallery-frontend/src/libs/httpRequester.ts`
3. `gallery-frontend/src/services/accountService.ts`

### 3. 화면 구현

1. `gallery-frontend/src/pages/Home.tsx`
2. `gallery-frontend/src/components/Card.tsx`
3. `gallery-frontend/src/pages/Login.tsx`
4. `gallery-frontend/src/pages/Join.tsx`
5. `gallery-frontend/src/pages/Cart.tsx`
6. `gallery-frontend/src/pages/OrderForm.tsx`
7. `gallery-frontend/src/pages/Orders.tsx`
8. `gallery-frontend/src/pages/OrderDetail.tsx`

### 4. 백엔드 요청 흐름

1. `gallery-backend/src/main/java/com/example/gallery/account/controller/AccountController.java`
2. `gallery-backend/src/main/java/com/example/gallery/item/controller/ItemController.java`
3. `gallery-backend/src/main/java/com/example/gallery/cart/controller/CartController.java`
4. `gallery-backend/src/main/java/com/example/gallery/order/controller/OrderController.java`

## 자주 확인할 디버깅 포인트

- 이미지가 안 보일 때
  - `public/img`에 파일이 있는지
  - 상품 API 응답에 `imgPath`가 있는지
  - 브라우저 Network에서 `/img/...` 요청이 200인지
- 로그인 상태가 이상할 때
  - Application > Cookies에서 토큰 확인
  - `GET /v1/api/account/check` 응답 확인
  - `401` 발생 시 `/v1/api/account/token` 재요청 여부 확인
- 주문 목록이 비정상일 때
  - `/v1/api/orders?page=0&size=5` 응답의 `content`, `number`, `totalPages`, `totalElements` 구조 확인

## 다음에 개선해볼 만한 것

- 폼 검증을 커스텀 훅으로 분리
- 서비스 응답 타입을 더 엄격하게 정의
- 테스트 코드 추가
- 액세스 토큰 저장 전략을 store와 통합
- 환경 변수 기반 시크릿/설정 분리
