import { Route, Routes } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { IsOwnerRequired } from "./components/IsOwnerRequired";
import { Unauthorized } from "./pages/Unauthorized";
import { Unavailable } from "./pages/Unavailable";

export const PokemonVotingDapp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />

      <Route element={<IsOwnerRequired />}>
        <Route path="/admin" element={<Admin />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Unavailable />}></Route>
    </Routes>
  );
};
