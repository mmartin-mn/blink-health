import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from "react-router-dom"
import { SearchPage } from './search'
import { DrugInfoPage } from "./drug-info"
import { Header } from "./header"

const Layout = () => {
  return <>
    <Header />
    <Outlet />
  </>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
  return <>
    <RouterProvider router={router} />
  </>
}