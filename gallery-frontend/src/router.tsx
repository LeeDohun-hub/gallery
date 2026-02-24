import { createBrowserRouter } from 'react-router-dom'
import App from './App'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />, // layout
      children: [
        {
          index: true,
          async lazy() {
            const { default: Home } = await import('./pages/Home')
            return { Component: Home }
          },
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
)


