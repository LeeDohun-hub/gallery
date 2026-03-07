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
            const { default: Home } = await import('./pages/Home');
            return { Component: Home };
          },
        },
        {
          path: 'join',
          async lazy() {
            const { default: Join } = await import('./pages/Join');
            return { Component: Join };
          },
        },
        {
          path: 'login',
          async lazy() {
            const { default: Login } = await import('./pages/Login');
            return { Component: Login };
          },
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);


