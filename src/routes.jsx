import Home from "./pages/Home.jsx";
import Customers from "./pages/Customers.jsx";
import Settings from "./pages/Settings.jsx";
import Reports from "./pages/Reports.jsx";
export const routes = [
  { path: "/", label: "Home", element: <Home /> },
  { path: "/customers", label: "Customers", element: <Customers /> },
  { path: "/settings", label: "Settings", element: <Settings /> },
  { path: "/reports", label: "Reports", element: <Reports /> },
];
