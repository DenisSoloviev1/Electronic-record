import { Routes, Route } from "react-router-dom";
import { routes } from "./lib";
import { CreateRoute } from "./lib/guards";
import Auth from "@/pages/ui/auth";
import NotFound from "@/pages/ui/notFound";

export const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Auth />} />
      <Route path={"*"} element={<NotFound />} />
      {routes.map(CreateRoute)}
    </Routes>
  );
};
