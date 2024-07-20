import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom"
import { SearchPage } from './search'
import { DrugInfoPage } from "./drug-info/DrugInfoPage"

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
            path: ":rxcui",
            element: <DrugInfoPage />,
          },
        ],
      }
    ]
  },
])


export const App = () => {
  return <RouterProvider router={router} />
}