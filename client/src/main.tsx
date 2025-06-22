import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./global.css";
import AuthPage from "./pages/AuthPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: (
      <div>
        <h1>home</h1>
        <Outlet />
      </div>
    ),
    children: [{ path: "newpage", element: <h1>newPage</h1> }],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
