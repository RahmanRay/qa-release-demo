import "./styles/global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { routes } from "./routes.jsx";
if (typeof __BUILD_INFO__ !== "undefined") window.__BUILD__ = __BUILD_INFO__;
const BASE_PATH = typeof __BASE_PATH__ !== "undefined" ? __BASE_PATH__ : "";
function App() {
  return (<BrowserRouter basename={BASE_PATH || undefined}><nav>{routes.map(r => <Link key={r.path} to={r.path}>{r.label}</Link>)}</nav>
    <main><Routes>{routes.map(r => <Route key={r.path} path={r.path} element={r.element} />)}</Routes></main></BrowserRouter>);
}
createRoot(document.getElementById("root")).render(<App />);
