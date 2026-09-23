import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CvPage from "./pages/CvPage.tsx";
import Contact from "./pages/Contact.tsx";
import DimensionSwitch from "./components/DimensionSwitch.tsx";
import { DimensionProvider } from "./context/DimensionContext.tsx";
const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <DimensionSwitch classic={<HomePage />} vibe="home" />,
      },
      {
        path: "/cv",
        element: <DimensionSwitch classic={<CvPage />} vibe="cv" />,
      },
      {
        path: "/contact",
        element: <DimensionSwitch classic={<Contact />} vibe="contact" />,
      },
    ],
  },
]);

if (!root) {
  throw new Error("Erreur");
}

createRoot(root).render(
  <StrictMode>
    <DimensionProvider>
      <RouterProvider router={router} />
    </DimensionProvider>
  </StrictMode>,
);
