import {createBrowserRouter, RouterProvider} from "react-router-dom"
import DashboardLayout from "./Layouts/DashboardLayout"
import Dashboard from "./Pages/Dashboard"
import ViewAllPosts from "./Pages/ViewAllPosts"
import AuthWrapper from "./Pages/AuthWrapper"
import ViewPost from "./Pages/ViewPost"
import WriteAPost from "./Pages/WriteAPost"

function App() {

  let router = createBrowserRouter([
    {
      path: "/",
      element: <AuthWrapper><DashboardLayout /></AuthWrapper>,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/all-posts",
          element: <ViewAllPosts />
        },
        {
          path: "/write",
          element: <WriteAPost />
        },
        {
          path: "/post/:title",
          element: <ViewPost />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
