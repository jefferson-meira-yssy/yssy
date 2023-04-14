import { Route, Routes as DomRoutes } from "react-router-dom";
import { RouterPath } from "../constants/routes";
import { Home } from "../page/home/home";

export function Routes() {
  return (
    <DomRoutes>
      <Route path={RouterPath.HOME} element={<Home />} />
    </DomRoutes>
  );
}
