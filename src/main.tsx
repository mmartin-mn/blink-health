import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom"
import { SearchPage } from './search'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate replace to="/drugs/search" />
      },
      {
        path: '/drugs',
        children: [
          {
            index: true,
            element: <Navigate replace to="/drugs/search" />
          },
          {
            path: "search",
            element: <SearchPage />,
            index: true
          },
          {
            path: ":drugName",
            element: <div>Drug Info</div>,
          },
        ],
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
