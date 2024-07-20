import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom"
import './index.css'

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
            element: <div>Search</div>,
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
