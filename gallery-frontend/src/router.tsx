import { createBrowserRouter } from 'react-router-dom';
import App from './App';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />, // layout
      children: [
        {
          index: true,
          async lazy() {
            const { default: Home } = await import('./pages/Home.tsx');
            return { Component: Home };
          },
        },
        {
          path: 'join',
          async lazy() {
            const { default: Join } = await import('./pages/Join.tsx');
            return { Component: Join };
          },
        },
        {
          path: 'login',
          async lazy() {
            const { default: Login } = await import('./pages/Login.tsx');
            return { Component: Login };
          },
        },
        {
          path: 'cart',
          async lazy() {
            const { default: Cart } = await import('./pages/Cart.tsx');
            return { Component: Cart };
          },
        },
        {
          path: 'order',
          async lazy() {
            const { default: OrderForm } = await import('./pages/OrderForm.tsx');
            return { Component: OrderForm };
          },
        },
        {
          path: 'orders',
          async lazy() {
            const { default: Orders } = await import('./pages/Orders.tsx');
            return { Component: Orders };
          },
        },
        {
          path: 'orders/:id',
          async lazy() {
            const { default: OrderDetail } = await import('./pages/OrderDetail.tsx');
            return { Component: OrderDetail };
          },
        }
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);


