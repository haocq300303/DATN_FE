import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.register} element={<Register />} />
        <Route index path={routes.login} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
