import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import AuthGuard from "./features/authentication/AuthGuard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./features/authentication/Auth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Navigate to="home" /> },
      {
        path: "home",
        element: (
          <AuthGuard>
            <Home />
          </AuthGuard>
        ),
      },
    ],
  },

  { path: "auth", element: <Auth /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
