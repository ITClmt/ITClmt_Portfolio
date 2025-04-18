import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CvPage from "./pages/CvPage.tsx";
import Contact from "./pages/Contact.tsx";
const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/CV",
        element: <CvPage />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
    ],
  },
]);

if (!root) {
  throw new Error("Erreur");
}

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
